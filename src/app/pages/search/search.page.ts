import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {IonSearchbar, NavController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchBar') searchBar: IonSearchbar;
  ionFocusSubscription: Subscription;
  ionCancelSubscription: Subscription;
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.searchBar && this.searchBar.setFocus();
  }

  async ngAfterViewInit() {

    this.ionCancelSubscription = this.searchBar.ionCancel.subscribe((canceled: CustomEvent) => {
      this.navCtrl.back();
    });

    this.ionFocusSubscription = this.searchBar.ionFocus.subscribe((focused: CustomEvent) => {
      console.log(focused);
    });

  }

  ngOnDestroy() {
    this.ionCancelSubscription.unsubscribe();
    this.ionFocusSubscription.unsubscribe();
  }

}
