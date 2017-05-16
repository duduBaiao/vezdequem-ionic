import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {Consumption} from '../../models/consumption';
import {Purpose, PurposeTitle, PurposeInfo} from '../../models/purpose';

@Component({
  templateUrl: 'payers.html'
})
export class PayersPage extends BasePage {

  public consumption: Consumption;
  private selectedPayerId: number;

  public purposeAmmount = Purpose.Ammount;
  public purposeCounter = Purpose.Counter;
  
  public purposeTitle: PurposeTitle;

  constructor(nav: NavController,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    params: NavParams) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.consumption = params.data;
    this.selectedPayerId = this.consumption.payerRecord.id;

    this.purposeTitle = PurposeInfo.Title[this.consumption.group.purpose];
  }

  payerChanged() {
    if (this.selectedPayerId != this.consumption.payerRecord.id) {

      this.consumption.payerRecord = this.consumption.records.find(record => record.id == this.selectedPayerId);
      this.nav.pop();    
    }
  }
}
