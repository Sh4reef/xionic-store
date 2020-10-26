import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorePage } from './store';

import { StorePageRoutingModule } from './store-routing.module';
import {ProductCardFluidComponent} from '../components/product-card-fluid/product-card-fluid.component';
import {ProductCardComponent} from '../components/product-card/product-card.component';
import {ProductsCardsGridComponent} from '../components/products-cards-grid/products-cards-grid.component';
import {ProductCardFluidListComponent} from '../components/product-card-fluid-list/product-card-fluid-list.component';
import {SlidesComponent} from '../components/slides/slides.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StorePageRoutingModule,
  ],
  declarations: [StorePage, ProductCardFluidListComponent, ProductCardFluidComponent, ProductsCardsGridComponent, ProductCardComponent, SlidesComponent]
})
export class Tab1PageModule {}
