import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {BaseProvider} from '../../common/providers/base-provider';
import {Consumption} from '../../models/consumption';

@Injectable()
export class Consumptions extends BaseProvider {

  register(consumption: Consumption): Observable<Response> {

    let body = {
      payer_record_id: consumption.payerRecord.id,

      consumers: consumption.records
        .filter(record => record.took)
        .map(record => { return {record_id: record.id}; }) || [],

      paid: consumption.paid
    };

    return this.http.post(Config.apiUrl + "/consumption/register.json",
      JSON.stringify(body),
      this.defaultOptions());    
  }
}
