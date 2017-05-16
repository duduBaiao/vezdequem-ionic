import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {Login} from '../../providers/login/login';

@Component({
  templateUrl: 'recover-password.html'
})
export class RecoverPasswordPage extends BasePage {

  public recoverForm: FormGroup;

  constructor(nav: NavController,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    public formBuilder: FormBuilder,
    private login: Login) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.recoverForm = formBuilder.group({
      email: ['', Validators.required],
    });
  }

  submit(event: Event) {
    event.preventDefault();

    if (!this.recoverForm.valid) {
      this.showAlert("Digite seu email!");
      return;
    }

    this.showLoading();

    this.login.recover(
      this.recoverForm.value.email.toLowerCase().trim()).subscribe(
        (user) => {
          this.hideLoading();

          setTimeout(() => { this.notifyRecoverSuccess(); }, 400);
        },
        (response) => {
          this.hideLoading();

          setTimeout(() => { this.showAlert("Não foi possível recuperar sua senha! O email está correto?"); }, 400);
        });
  }

  notifyRecoverSuccess() {

    this.showAlert("Foram enviadas para o seu email as instruções para recuperação de senha. Por favor, verifique.", "Aviso", "OK",
      () => {

        setTimeout(() => { this.nav.pop(); }, 400);
      });    
  }
}
