import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Config} from '../../providers/config';

@Injectable()
export class BaseProvider {

  constructor(
    public http: Http,
    public config: Config) {
  }

  defaultOptions() {
    let session = this.config.session();

    let headers = new Headers(
        {'Content-Type': 'application/json',
        'X-User-Email': session.authentication.user_email,
        'X-User-Token': session.authentication.token});

    return new RequestOptions({headers: headers});    
  }
}
