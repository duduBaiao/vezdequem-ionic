import { Config } from './../../providers/config';
import {Component} from '@angular/core';
import {NavController, MenuController, AlertController, LoadingController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {GroupsPage} from '../groups/groups';
import {RegisterPage} from '../register/register';
import {RecoverPasswordPage} from '../recover-password/recover-password';
import {Login} from '../../providers/login/login';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage extends BasePage {

  public loginForm: FormGroup;
  public appVersion = Config.appVersion;

  constructor(nav: NavController,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    private menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    private login: Login) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  submit(event: Event) {
    event.preventDefault();

    if (!this.loginForm.valid) {
      this.showAlert("Digite seu email e senha!");
      return;
    }

    this.showLoading();

    this.login.signIn(
      this.loginForm.value.email.toLowerCase().trim(),
      this.loginForm.value.password.trim()).subscribe(
        (user) => {
          this.hideLoading();

          setTimeout(() => { this.nav.setRoot(GroupsPage); }, 400);
        },
        (response) => {
          this.hideLoading();

          setTimeout(() => { this.showAlert("Email ou senha inválidos!"); }, 400);
        });
  }

  register() {
    this.nav.push(RegisterPage);
  }

  recoverPassword() {
    this.nav.push(RecoverPasswordPage);
  }    
}
