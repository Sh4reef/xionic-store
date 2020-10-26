import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {assign, interpret, Interpreter, Machine} from 'xstate';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartInterpreter: Interpreter<any>;

  constructor(
    private http: HttpClient
  ) {

    const cartMachine = Machine({
      id: 'cartMachine',
      initial: 'idle',
      context: {
        items: undefined,
        error: undefined
      },
      states: {
        idle: {
          always: 'fetchingCartItems'
        },
        fetchingCartItems: {
          id: 'fetchingCartItems',
          initial: 'idle',
          states: {
            idle: {
              always: 'loading'
            },
            loading: {
              invoke: {
                id: 'getCartItems',
                src: (context, event) => this.fetchCartItems(),
                onDone: {
                  target: 'success',
                  actions: assign({items: (context, event) => event.data})
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
        },
        addItemToCart: {
          id: 'addItemToCart',
          initial: 'idle',
          states: {
            idle: {
              always: 'loading'
            },
            loading: {
              invoke: {
                id: 'addItemToCart',
                src: (context, event) => this.addItemToCart(event.data),
                onDone: {
                  target: 'success',
                  actions: assign({items: (context: any, event) => [event.data, ...context.items]})
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
        }
      },
      on: {
        FETCH_CART_ITEMS: 'fetchingCartItems',
        ADD_ITEM_TO_CART: 'addItemToCart'
      }
    });

    this.cartInterpreter = interpret(cartMachine).start();
  }

  fetchCartItems() {
    return this.http.get('http://localhost:3000/carts').toPromise();
  }

  addItemToCart(data) {
    console.log(data);
    return this.http.post('http://localhost:3000/carts', data).toPromise();
  }
}
