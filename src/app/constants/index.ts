import {Actions} from './actions.enum';
import {States} from './states.enum';


export default class ConstantsClassBase {
  // States
  AUTHENTICATING: string;
  FAILURE: string;
  IDLE: string;
  LOADING: string;
  SUCCESS: string;
  IS_AUTHENTICATED: string;
  IS_ALREADY_AUTHENTICATED: string;
  IS_NOT_AUTHENTICATED: string;
  AUTHENTICATING_SUCCESS: string;
  AUTHENTICATING_FAILURE: string;
  LOGGING_OUT: string;

  // Actions
  ADD_ITEM_TO_CART: string;
  FETCH_CART_ITEMS: string;
  LOGIN: string;
  REGISTER: string;
  LOGOUT: string;
  FETCH_CATEGORIES: string;

  constructor() {
    this.IDLE = States.IDLE;
    this.LOADING = States.LOADING;
    this.SUCCESS = States.SUCCESS;
    this.FAILURE = States.FAILURE;
    this.AUTHENTICATING = States.AUTHENTICATING;
    this.IS_AUTHENTICATED = States.IS_AUTHENTICATED;
    this.LOGGING_OUT = States.LOGGING_OUT;
    this.IS_NOT_AUTHENTICATED = `${States.IS_NOT_AUTHENTICATED}`;
    this.IS_ALREADY_AUTHENTICATED = States.IS_ALREADY_AUTHENTICATED;
    this.AUTHENTICATING_FAILURE = `${States.AUTHENTICATING}_${States.FAILURE}`;
    this.AUTHENTICATING_SUCCESS = `${States.AUTHENTICATING}_${States.SUCCESS}`;

    this.LOGIN = Actions.LOGIN;
    this.REGISTER = Actions.REGISTER;
    this.FETCH_CART_ITEMS = Actions.FETCH_CART_ITEMS;
    this.ADD_ITEM_TO_CART = Actions.ADD_ITEM_TO_CART;
    this.LOGOUT = Actions.LOGOUT;
    this.FETCH_CATEGORIES = Actions.FETCH_CATEGORIES;
  }
}
