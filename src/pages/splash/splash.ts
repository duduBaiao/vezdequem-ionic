import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {LoginPage} from '../../pages/login/login';
import {GroupsPage} from '../../pages/groups/groups';
import {Config} from '../../providers/config';

@Component({
  templateUrl: 'splash.html'
})
export class SplashPage extends BasePage {

  constructor(nav: NavController,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    private storage: Storage,
    private config: Config) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.storage.ready().then(() => {    

      this.config.loadSession().then(
        (session) => {

          if (session.authentication == null) {
            this.nav.setRoot(LoginPage);
          }
          else {
            this.nav.setRoot(GroupsPage);
          }
        });
      });
  }
}
