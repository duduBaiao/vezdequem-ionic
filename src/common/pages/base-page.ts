import { Config } from './../../providers/config';
import {NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
import {Locale, LocaleService} from 'angular2localization/angular2localization';

export class BasePage extends Locale {

  public dataLoaded = false;

  public errorMessage = "";

  public inputCurrencyDigits = "1.0-2";
  public currencyDigits = "1.2-2";

  private static loading: Loading;

  constructor(public nav: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public locale: LocaleService) {

    super(locale);
  }

  formatCurrency(num) {
    return num.toLocaleString(Config.locale, {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }

  showLoading(message?: string) {

    BasePage.loading = this.loadingCtrl.create({
        content: message || "Aguarde..."
    });

    BasePage.loading.present();
  }

  hideLoading() {

    if (BasePage.loading) {
      BasePage.loading.dismiss();
      BasePage.loading = null;
    }
  }

  showAlert(message: string, title?: string, buttonTitle?: string, handler?) {

    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [
          {
            text: buttonTitle || "Voltar",
            handler: handler
          }]
    });

    setTimeout(() => { alert.present(); }, 100);    
  }

  prompt(title: string, message: string, placeholder: string, okHandler, value?: string) {

    let prompt = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: [
        {
          name: 'value',
          placeholder: placeholder,
          value: value
        },
      ],
      buttons: [
        {
          text: 'OK',
          handler: okHandler
        },
        {
          text: 'Cancelar'
        }
      ]
    });

    setTimeout(() => { prompt.present(); }, 100);
  }

  confirm(title: string, message: string, okHandler) {

    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Sim',
          handler: okHandler
        },
        {
          text: 'Não'
        }
      ]
    });

    setTimeout(() => { confirm.present(); }, 100);
  }
}
