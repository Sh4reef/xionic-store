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
      initial: this.IS_AUTHENTICATED,
      context: {
        token: this.getPersistedToken(),
        error: undefined
      },
      states: {
        // When hard reloading the app the user machine initially will be on this state
        // And it will make a request, there is always two possible states IS_ALREADY_AUTHENTICATED or IS_NOT_AUTHENTICATED
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
        // This state always comes from IS_NOT_AUTHENTICATED or AUTHENTICATING_FAILURE,
        // Where the user send a login event to the user machine
        // Possible states are AUTHENTICATING_SUCCESS, AUTHENTICATING_FAILURE
        [this.AUTHENTICATING]: {
          invoke: {
            src: (context, event: any) => this.login(event.data),
            onDone: {
              target: this.AUTHENTICATING_SUCCESS,
              actions: [
                assign({error: undefined, token: (context, event: any) => event.data.jwt}),
                (context) => this.persistToken(context),
              ]
            },
            onError: {
              target: this.AUTHENTICATING_FAILURE,
              actions: assign({error: (context, event) => {
                if (event.data.status >= 400) {
                  return event.data.error.message[0].messages[0].message
                }
                return event.data.statusText
              }})
            }
          }
        },
        // If the user on this state he can only send a login event which will transition to AUTHENTICATING state.
        [this.IS_NOT_AUTHENTICATED]: {
          on: {
            [this.LOGIN]: this.AUTHENTICATING
          }
        },
        // The user can only logout if on this state
        [this.IS_ALREADY_AUTHENTICATED]: {
          on: {
            ...canLogout
          }
        },

        // This is same as IS_NOT_AUTHENTICATED the user can only do login action
        [this.AUTHENTICATING_FAILURE]: {
          on: {
            [this.LOGIN]: this.AUTHENTICATING
          }
        },
        // The user can only logout if on this state
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
