import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {assign, interpret, Interpreter, Machine} from 'xstate';
import ConstantsClassBase from '../constants';

const SERVER_HOST = environment.serverHost;
const SERVER_PORT = environment.serverPort;

@Injectable({
  providedIn: 'root'
})
export class UserService extends ConstantsClassBase {

  userInterpreter: Interpreter<any>;

  constructor(
    private http: HttpClient
  ) {
    super();

    const canLogout = {
      [this.LOGOUT]: {
        target: this.IS_NOT_AUTHENTICATED,
        actions: [
          () => this.logout(),
          assign({error: undefined, token: undefined})
        ]
      }
    }

    const userMachine = Machine({
      id: 'user',
      initial: this.IDLE,
      context: {
        token: this.getPersistedToken(),
        error: undefined
      },
      states: {
        [this.IDLE]: {
          always: this.IS_AUTHENTICATED
        },
        [this.IS_AUTHENTICATED]: {
          invoke: {
            src: (context) => this.isAuthenticated(context),
            onDone: {
              target: this.IS_ALREADY_AUTHENTICATED,
            },
            onError: {
              target: this.IS_NOT_AUTHENTICATED,
            }
          }
        },
        [this.AUTHENTICATING]: {
          invoke: {
            src: (context, event: any) => this.login(event.data),
            onDone: {
              target: this.AUTHENTICATING_SUCCESS,
              actions: [
                assign({token: (context, event: any) => event.data.jwt}),
                (context) => this.persistToken(context)
              ]
            },
            onError: {
              target: this.AUTHENTICATING_FAILURE,
              actions: assign({error: (context, event) => event.data.error})
            }
          }
        },
        [this.IS_NOT_AUTHENTICATED]: {
          on: {
            [this.LOGIN]: this.AUTHENTICATING
          }
        },
        [this.IS_ALREADY_AUTHENTICATED]: {
          on: {
            ...canLogout
          }
        },
        [this.AUTHENTICATING_FAILURE]: {
          on: {
            [this.LOGIN]: this.AUTHENTICATING
          }
        },
        [this.AUTHENTICATING_SUCCESS]: {
          on: {
            ...canLogout
          }
        }
      },
    });

    this.userInterpreter = interpret(userMachine).start();
  }

  private isAuthenticated(context) {
    return this.http.get(`http://${SERVER_HOST}:${SERVER_PORT}/users/me`, {
      headers: {
        'Authorization': `Bearer ${context.token}`
      }
    }).toPromise();
  }

  private login(data) {
    console.log(data);
    return this.http.post(`http://${SERVER_HOST}:${SERVER_PORT}/auth/local`, data).toPromise();
  }


  private getPersistedToken() {
    return localStorage.getItem('token') === typeof undefined ? undefined : localStorage.getItem('token');
  }

  private persistToken(context) {
    localStorage.setItem('token', context.token);
  }

  private logout() {
    localStorage.removeItem('token');
  }
}
