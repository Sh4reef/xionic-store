import { Component, OnDestroy, OnInit } from '@angular/core';
import {State} from 'xstate';
import {Actions} from '../constants/actions.enum';
import {States} from '../constants/states.enum';
import ConstantsBaseClass from '../constants';
import {CartService} from '../services/cart.service';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage extends ConstantsBaseClass implements OnInit, OnDestroy {

  FETCH_CART_ITEMS_SUCCESS: string;
  ADD_ITEM_TO_CART_SUCCESS: string;

  private cartInterpreterSubscription: Subscription;
  protected cartState: State<any>;

  constructor(
    private cartService: CartService
  ) {
    super();

    this.FETCH_CART_ITEMS_SUCCESS = `${this.FETCH_CART_ITEMS}.${this.SUCCESS}`;
    this.ADD_ITEM_TO_CART_SUCCESS = `${this.ADD_ITEM_TO_CART}.${this.SUCCESS}`;
  }

  ngOnInit() {
    this.cartInterpreterSubscription = from(this.cartService.cartInterpreter).subscribe((state: State<any>) => {
      this.cartState = state
    });
  }

  ngOnDestroy() {
    this.cartInterpreterSubscription.unsubscribe();
  }
}
