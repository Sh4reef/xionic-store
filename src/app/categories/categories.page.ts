import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {State} from 'xstate';
import {CategoriesService} from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {

  categoriesInterpreterSubscription;
  categoriesState: State<any>;

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.categoriesInterpreterSubscription = this.categoriesService.categoriesInterpreter.subscribe((state: State<any>) => {
      this.categoriesState = state;
    });
  }

  ngOnDestroy() {
    this.categoriesInterpreterSubscription.unsubscribe();
  }

}
