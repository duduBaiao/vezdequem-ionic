import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {GroupsPage} from '../groups/groups';
import {Login} from '../../providers/login/login';

@Component({
  templateUrl: 'register.html'
})
export class RegisterPage extends BasePage {

  public registerForm: FormGroup;

  constructor(nav: NavController,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    public formBuilder: FormBuilder,
    private login: Login) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.registerForm = formBuilder.group({
      nick_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(event: Event) {
    event.preventDefault();

    if (!this.registerForm.valid) {
      this.showAlert("Digite todos seus dados!");
      return;
    }

    this.showLoading();

    this.login.signUp(
      this.registerForm.value.nick_name.trim(),
      this.registerForm.value.email.toLowerCase().trim(),
      this.registerForm.value.password.trim()).subscribe(
        (user) => {
          this.hideLoading();

          setTimeout(() => { this.notifySignUpSuccess(); }, 400);
        },
        (response) => {
          this.hideLoading();

          setTimeout(() => { this.showAlert("Não foi possível realizar o cadastro!"); }, 400);
        });
  }

  notifySignUpSuccess() {

    this.showAlert("Cadastro efetuado com sucesso!", "Aviso", "OK",
      () => {

        setTimeout(() => { this.nav.setRoot(GroupsPage); }, 400);
      });    
  }
}

