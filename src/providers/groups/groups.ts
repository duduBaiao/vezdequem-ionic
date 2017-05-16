import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {BaseProvider} from '../../common/providers/base-provider';
import {Group} from '../../models/group';
import {Purpose} from '../../models/purpose';
import {Record} from '../../models/record';

@Injectable()
export class Groups extends BaseProvider {

  load(): Observable<Array<Group>> {

    return this.http.get(Config.apiUrl + "/groups.json", this.defaultOptions())
      .map(res => res.json())
      .map(groups => {

        return groups;
      });
  }  

  add(name: string, purpose: Purpose, choose_takers: boolean): Observable<Group> {

    let body = JSON.stringify({group: {name: name, purpose: purpose, choose_takers: choose_takers}});

    return this.http.post(Config.apiUrl + "/groups.json", body, this.defaultOptions())
      .map(res => res.json())
      .map(group => {

        return group;
      });    
  }

  edit(group: Group, name: string): Observable<Group> {

    let body = JSON.stringify({group: {id: group.id, name: name}});

    return this.http.patch(Config.apiUrl + group.group_url, body, this.defaultOptions())
      .map(res => res.json())
      .map(group => {

        return group;
      });    
  }

  addUser(group: Group, nick_name: string, email: string): Observable<Record> {

    let body = JSON.stringify({nick_name: nick_name, email: email});

    return this.http.post(Config.apiUrl + "/groups/" + group.id + "/add_participant.json", body, this.defaultOptions())
      .map(res => res.json())
      .map(record => {

        return record;
      });    
  }
}
