import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UserService} from './services/user.service';
import {State} from 'xstate';
import ConstantsClassBase from './constants';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent extends ConstantsClassBase implements OnInit, OnDestroy {
  userState: State<any>;
  userInterpreterSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    super();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.userInterpreterSubscription = from(this.userService.userInterpreter).subscribe((state: State<any>) => {
      console.log(state);
      this.userState = state;
    });
  }

  ngOnDestroy() {
    this.userInterpreterSubscription.unsubscribe();
  }
}
