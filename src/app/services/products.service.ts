import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interpret, assign, Interpreter, Machine } from 'xstate';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsInterpreter: Interpreter<any>;

  constructor(
    private http: HttpClient
  ) {

    const productsMachine = Machine({
      id: 'products',
      initial: 'idle',
      context: {
        products: Array,
        error: String
      },
      states: {
        idle: {
          always: 'loading'
        },
        loading: {
          invoke: {
            id: 'getProducts',
            src: (context, event) => this.fetchProducts(),
            onDone: {
              target: 'success',
              actions: assign({products: (context, event) => event.data})
            },
            onError: {
              target: 'failure',
              actions: assign({error: (context, event) => event.data})
            }
          }
        },
        success: {},
        failure: {}
      }
    });

    this.productsInterpreter = interpret(productsMachine).start();
  }

  fetchProducts() {
    return this.http.get('http://localhost:3000/products').toPromise();
  }
}
