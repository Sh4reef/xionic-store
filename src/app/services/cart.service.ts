import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {assign, interpret, Interpreter, Machine, State} from 'xstate';
import ConstantsClassBase from '../constants';
import {UserService} from './user.service';

const SERVER_HOST = environment.serverHost;
const SERVER_PORT = environment.serverPort;

@Injectable({
  providedIn: 'root'
})
export class CartService extends ConstantsClassBase {
  cartInterpreter: Interpreter<any>;
  userState: State<any>;
  userInterpreterSubscription;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    super();

    this.userService.userInterpreter.subscribe((state: State<any>) => {
      this.userState = state;
    });

    // possibles states IDLE, FETCH_CART_ITEMS, ADD_ITEM_TO_CART, SUCCESS, FAILURE
    const cartMachine = Machine({
      id: 'cartMachine',
      initial: this.IDLE,
      context: {
        items: undefined,
        error: undefined
      },
      states: {
        [this.IDLE]: {
          // An eventless transition is a transition that is always taken when the machine is in the state where it is defined
          // https://xstate.js.org/docs/guides/transitions.html#eventless-always-transitions
          // It's unnecessary to have this eventless without Guarded transitions, so it's more useful for guarded transitions
          // https://xstate.js.org/docs/guides/guards.html#guards-condition-functions
          always: this.FETCH_CART_ITEMS
        },
        [this.FETCH_CART_ITEMS]: {
          initial: this.LOADING,
          states: {
            [this.LOADING]: {
              invoke: {
                src: (context, event) => this.fetchCartItems(),
                onDone: {
                  target: this.SUCCESS,
                  actions: assign({items: (context, event) => event.data.items})
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
        },
        [this.ADD_ITEM_TO_CART]: {
          initial: this.LOADING,
          states: {
            [this.LOADING]: {
              invoke: {
                src: (context, event) => this.addItemToCart(event.data),
                onDone: {
                  target: this.SUCCESS,
                  actions: assign({items: (context: any, event) => [event.data, ...context.items]})
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
        }
      },
      on: {
        [this.FETCH_CART_ITEMS]: this.FETCH_CART_ITEMS,
        [this.ADD_ITEM_TO_CART]: this.ADD_ITEM_TO_CART
      }
    });

    this.cartInterpreter = interpret(cartMachine).start();
  }

  fetchCartItems() {
    return this.http.get(`http://${SERVER_HOST}:${SERVER_PORT}/carts/mycart`, {
      headers: {
        'Authorization': `Bearer ${this.userState.context.token}`
      }
    }).toPromise();
  }

  addItemToCart(data) {
    return this.http.post(`http://${SERVER_HOST}:${SERVER_PORT}/carts`, data).toPromise();
  }
}
