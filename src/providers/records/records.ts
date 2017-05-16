import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {BaseProvider} from '../../common/providers/base-provider';
import {Record} from '../../models/record';

@Injectable()
export class Records extends BaseProvider {

  load(url: string): Observable<Array<Record>> {

    return this.http.get(Config.apiUrl + url, this.defaultOptions())
      .map(res => res.json())
      .map(records => {

        return records;
      });
  }

  remove(record: Record): Observable<Response>  {

    return this.http.delete(Config.apiUrl + record.record_url, this.defaultOptions());
  }  
}
