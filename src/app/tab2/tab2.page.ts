import { Component, OnInit } from '@angular/core';
import {State} from 'xstate';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartInterpreter.subscribe((state: State<any>) => {
      console.log(state);
    });
  }
}
