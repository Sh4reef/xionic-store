import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {State} from 'xstate';
import {CategoriesService} from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, AfterViewInit, OnDestroy {

  categoriesInterpreterSubscription;
  categoriesState: State<any>;
  @ViewChild('categories') categoriesRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    // console.log(this.route.snapshot.params);
    this.categoriesInterpreterSubscription = this.categoriesService.categoriesInterpreter.subscribe((state: State<any>) => {
      this.categoriesState = state;
    });
  }

  ngAfterViewInit() {
    this.categoriesRef.nativeElement.scrollTo = 200;
  }

  ngOnDestroy() {
    this.categoriesInterpreterSubscription.unsubscribe();
  }

}
