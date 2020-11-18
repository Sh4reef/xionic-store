import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { from, Subscription } from 'rxjs';
import ConstantsClassBase from 'src/app/constants';
import {UserService} from 'src/app/services/user.service';
import { State } from 'xstate';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent extends ConstantsClassBase implements OnInit, OnDestroy {

  userData = {
    identifier: '',
    password: '',
  }

  loginForm = new FormGroup({
    identifier: new FormControl(this.userData.identifier, Validators.required),
    password: new FormControl(this.userData.password, Validators.required)
  });

  private toast: any;

  protected userState: State<any>;
  protected userInterpreterSubscription: Subscription;

  constructor(
    private userService: UserService,
    private toastController: ToastController
  ) {
    super();
  }

  ngOnInit() {
    this.initializeToast();

    this.userInterpreterSubscription = from(this.userService.userInterpreter).subscribe(async (state: State<any>) => {
      this.userState = state;

      if (state.matches(this.AUTHENTICATING_FAILURE)) {
        !this.toast && await this.initializeToast();
        this.toast.message = state.context.error.message[0].messages[0].message,
        await this.toast.present();
      }

      if ([this.AUTHENTICATING_SUCCESS].some(state.matches)) {
        this.toast.dismiss();
      }
    });
  }

  async initializeToast() {
    this.toast = await this.toastController.create({
      buttons: [
        {
          side: 'end',
          icon: 'close',
          handler: () => {
            this.toast = undefined;
          }
        }
      ],
      color: 'danger',
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.userInterpreter.send(this.LOGIN, {data: this.loginForm.value});
    }
  }

  ngOnDestroy() {
    this.userInterpreterSubscription.unsubscribe();
  }
}
