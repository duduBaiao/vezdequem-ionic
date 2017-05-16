import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {BaseProvider} from '../../common/providers/base-provider';
import {User} from './../../models/user';

@Injectable()
export class Users extends BaseProvider {

  edit(nick_name: string): Observable<User> {

    let body = JSON.stringify({user: {nick_name: nick_name}});

    return this.http.patch(Config.apiUrl + "/logged_users.json", body, this.defaultOptions())
      .map(res => res.json())
      .map(user => {

        this.config.setNickName(user.nick_name);

        return user;
      });
  }  
}
