import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {State} from 'xstate';
import {CartService} from '../../services/cart.service';
import {ProductsService} from '../../services/products.service';

interface ProductsMachineStateContext {
  readonly products: Array<any>;
}

interface ProductsMachineState {
  readonly context: ProductsMachineStateContext
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit, OnDestroy {
  // @TODO: Product type must be implemented later
  data: any;
  productsState: State<ProductsMachineStateContext>;
  productsInterpreterSubscription;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    this.productsInterpreterSubscription = this.productsService.productsInterpreter.subscribe((state: State<ProductsMachineStateContext>) => {
      this.productsState = state;
      if (state.matches('success')) {
        this.data = state.context.products.find((product) => product.id === productId);
      }
    });
  }

  addToCart() {
    // this.cartService.addItemToCart()
  }

  ngOnDestroy() {
    this.productsInterpreterSubscription.unsubscribe();
  }
}
