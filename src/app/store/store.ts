import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonToolbar } from '@ionic/angular';
import { State } from 'xstate';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-store',
  templateUrl: 'store.page.html',
  styleUrls: ['store.page.scss']
})
export class StorePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('toolbar') toolbar: IonToolbar;
  productsInterpreterSubscription;
  productsState: State<any>;

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.productsInterpreterSubscription = this.productsService.productsInterpreter.subscribe((state: State<any>) => {
      this.productsState = state;
    });
  }

  ngAfterViewInit() {
    console.log(this.toolbar);
  }

  ngOnDestroy() {
    this.productsInterpreterSubscription.unsubscribe();
  }
}
