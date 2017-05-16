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

  signIn(email: string, password: string): Observable<User> {

    let body = JSON.stringify({user: {email: email, password: password, remember_me: 1}});

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});    

    return this.http.post(Config.apiUrl + "/users/sign_in.json", body, options)
      .map(res => res.json())
      .map(user => {

        this.config.setUser(user);

        return user;
      });
  }

  signUp(nick_name: string, email: string, password: string): Observable<User> {

    let body = JSON.stringify({user: {nick_name: nick_name, email: email, password: password}});

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});    

    return this.http.post(Config.apiUrl + "/users.json", body, options)
      .map(res => res.json())
      .map(user => {

        this.config.setUser(user);

        return user;
      });
  }

  recover(email: string): Observable<Response> {

    let body = JSON.stringify({user: {email: email}});

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});    

    return this.http.post(Config.apiUrl + "/users/password.json", body, options);
  }  
}

