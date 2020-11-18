import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart.page';

import { CartPageRoutingModule } from './cart-routing.module';
import {ProductCardFluidListComponent} from '../components/product-card-fluid-list/product-card-fluid-list.component';
import {ProductCardFluidComponent} from '../components/product-card-fluid/product-card-fluid.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CartPageRoutingModule
  ],
  declarations: [CartPage, ProductCardFluidListComponent, ProductCardFluidComponent]
})
export class CartPageModule {}
