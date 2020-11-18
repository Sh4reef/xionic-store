import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlSegmentGroup, Route, UrlMatchResult } from '@angular/router';
import {ProductsListComponent} from '../components/products-list/products-list.component';

import { CategoriesPage } from './categories.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },
  {
    component: ProductsListComponent,
    matcher: (segmants: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
      if (segmants.length >= 1) {
        const result: UrlMatchResult = {consumed: segmants, posParams: {}};
        segmants.forEach((segmant: UrlSegment, index: number) => {
          result.posParams = Object.assign(result.posParams, {
            [`category_${index}`]: new UrlSegment(segmant.path, {})
          });
        });
        return result;
      }
      return {consumed: segmants};
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}
