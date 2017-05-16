import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, ViewController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {Groups} from '../../providers/groups/groups';
import {Consumption} from '../../models/consumption';

@Component({
  templateUrl: 'participant.html'
})
export class ParticipantPage extends BasePage {

  public consumption: Consumption;

  public participantForm: FormGroup;

  constructor(nav: NavController,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    params: NavParams,
    private viewCtrl: ViewController,    
    public formBuilder: FormBuilder,
    private groupsProvider: Groups) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.consumption = params.data.consumption;

    this.participantForm = formBuilder.group({
      nick_name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  submit(event: Event) {
    event.preventDefault();

    if (!this.participantForm.valid) {
      this.showAlert("Digite todos os dados do participante!");
      return;
    }

    this.showLoading();

    this.groupsProvider.addUser(
      this.consumption.group,
      this.participantForm.value.nick_name.trim(),
      this.participantForm.value.email.toLowerCase().trim()).subscribe(
        (record) => {
          this.hideLoading();

            this.consumption.records.push(record);

            setTimeout(() => { this.dismiss(); }, 400);
        },
        (response) => {
          this.hideLoading();

          setTimeout(() => { this.showAlert("Não foi possível realizar o cadastro!"); }, 400);
        });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }  
}