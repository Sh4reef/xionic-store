import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interpret, assign, Interpreter, Machine } from 'xstate';
import ConstantsClassBase from '../constants';
import { environment } from 'src/environments/environment';

const SERVER_HOST = environment.serverHost;
const SERVER_PORT = environment.serverPort;

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ConstantsClassBase {

  productsInterpreter: Interpreter<any>;

  constructor(
    private http: HttpClient
  ) {
    super();

    const productsMachine = Machine({
      id: 'productsMachine',
      initial: this.IDLE,
      context: {
        products: Array,
        error: String
      },
      states: {
        [this.IDLE]: {
          always: this.LOADING
        },
        [this.LOADING]: {
          invoke: {
            src: (context, event) => this.fetchProducts(),
            onDone: {
              target: this.SUCCESS,
              actions: assign({products: (context, event) => event.data})
            },
            onError: {
              target: this.FAILURE,
              actions: assign({error: (context, event) => event.data})
            }
          }
        },
        [this.SUCCESS]: {},
        [this.FAILURE]: {}
      }
    });

    this.productsInterpreter = interpret(productsMachine).start();
  }

  fetchProducts() {
    return this.http.get(`http://${SERVER_HOST}:${SERVER_PORT}/products`).toPromise();
  }
}
