import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {assign, interpret, Interpreter, Machine} from 'xstate';
import ConstantsClassBase from '../constants';

const SERVER_HOST = environment.serverHost;
const SERVER_PORT = environment.serverPort;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ConstantsClassBase {

  categoriesInterpreter: Interpreter<any>;

  constructor(
    private http: HttpClient
  ) {
    super();

    const categoriesMachine = Machine({
      id: 'categoriesMachine',
      initial: this.LOADING,
      context: {
        categories: undefined
      },
      states: {
        [this.LOADING]: {
          invoke: {
            src: () => this.fetchCategories(),
            onDone: {
              target: this.SUCCESS,
              actions: assign({categories: (context, event) => event.data})
            },
            onError: {
              target: this.FAILURE,
              actions: assign({error: (context, event) => {
                if (event.data.status >= 400) {
                  return event.data.error
                }
                return event.data.statusText;
              }})
            }
          }
        },
        [this.SUCCESS]: {},
        [this.FAILURE]: {}
      }
    });

    this.categoriesInterpreter = interpret(categoriesMachine).start();
  }

  fetchCategories() {
    return this.http.get(`http://${SERVER_HOST}:${SERVER_PORT}/categories`).toPromise();
  }
}
