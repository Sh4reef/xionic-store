import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ConstantsClassBase from '../constants';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage extends ConstantsClassBase {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    super();
  }

  logout() {
    this.userService.userInterpreter.send(this.LOGOUT);
    this.router.navigateByUrl('');
  }
}
