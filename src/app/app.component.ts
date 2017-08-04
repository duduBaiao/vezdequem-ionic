import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, AlertController, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LocaleService} from 'angular2localization/angular2localization';
import {Config} from '../providers/config';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {GroupsPage} from '../pages/groups/groups';

import "intl";
import "intl/locale-data/jsonp/pt-BR";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: Array<{title: string, component: any}>;

  constructor(public locale: LocaleService,
    private platform: Platform,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private config: Config) {

    this.initializeApp();

    this.pages = [
      {title: 'Meus Grupos', component: GroupsPage},
      {title: 'Editar meu cadastro', component: ProfilePage}
    ];
  }
  
  initializeApp() {
    this.platform.ready().then(() => {

      this.locale.definePreferredLocale(Config.language, Config.country);
      this.locale.definePreferredCurrency(Config.currency);

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

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (this.nav.getActive().component != page.component) {
      setTimeout(() => { this.nav.setRoot(page.component, null, {animate: false}); }, 100);
    }
  }

  logOut() {
    setTimeout(() => { this.confirmLogout(); }, 100);
  }

  confirmLogout() {
    
    let confirm = this.alertCtrl.create({
      title: "Confirmação",
      message: "Tem certeza de que deseja desconectar?",
      buttons: [
        {
          text: 'Sim',
          handler: () => {

            this.config.clearSession();

            setTimeout(() => { this.nav.setRoot(LoginPage); }, 400);
          }
        },
        { text: 'Não' }
      ]
    });

    confirm.present();
  }
}
