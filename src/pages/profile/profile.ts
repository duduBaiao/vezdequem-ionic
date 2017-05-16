import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, MenuController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {Users} from '../../providers/users/users';
import {Config} from './../../providers/config';

@Component({
  templateUrl: 'profile.html'
})
export class ProfilePage extends BasePage {

  public profileForm: FormGroup;

  constructor(nav: NavController,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    private menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    private usersProvider: Users,
    config: Config) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.profileForm = formBuilder.group({
      nick_name: [config.session().nick_name, Validators.required]
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
  }

  submit(event: Event) {
    event.preventDefault();

    if (!this.profileForm.valid) {
      this.showAlert("Digite todos seus dados!");
      return;
    }

    this.showLoading();

    this.usersProvider.edit(
      this.profileForm.value.nick_name.trim()).subscribe(
        (user) => {
          this.hideLoading();

          setTimeout(() => { this.showAlert("Atualização efetuada com sucesso!", "Aviso", "OK"); }, 400);
        },
        (response) => {
          this.hideLoading();

          setTimeout(() => { this.showAlert("Não foi possível atualizar seus dados!"); }, 400);
        });
  }
}
