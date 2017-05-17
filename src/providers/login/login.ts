import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {User} from '../../models/user';

@Injectable()
export class Login {

  constructor(
    private http: Http,
    private config: Config) {
  }

  defaultOptions() {
    let headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }

  signIn(email: string, password: string): Observable<User> {

    let body = JSON.stringify({user: {email: email, password: password, remember_me: 1}});

    return this.http.post(Config.apiUrl + "/users/sign_in.json", body, this.defaultOptions())
      .map(res => res.json())
      .map(user => {

        this.config.setUser(user);

        return user;
      });
  }

  signUp(nick_name: string, email: string, password: string): Observable<User> {

    let body = JSON.stringify({user: {nick_name: nick_name, email: email, password: password}});

    return this.http.post(Config.apiUrl + "/users.json", body, this.defaultOptions())
      .map(res => res.json())
      .map(user => {

        this.config.setUser(user);

        return user;
      });
  }

  recover(email: string): Observable<Response> {

    let body = JSON.stringify({user: {email: email}});

    return this.http.post(Config.apiUrl + "/users/password.json", body, this.defaultOptions());
  }  
}

