import {Component} from '@angular/core';
import {NavController, NavParams, MenuController, AlertController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocaleService, LocaleParser, validateLocaleNumber} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {Records} from '../../providers/records/records';
import {Consumption} from '../../models/consumption';
import {Purpose, PurposeTitle, PurposeInfo} from '../../models/purpose';
import {Group} from '../../models/group';
import {PayersPage} from '../../pages/payers/payers';
import {GroupAdmPage} from '../../pages/group-adm/group-adm';
import {Consumptions} from '../../providers/consumptions/consumptions';

@Component({
  templateUrl: 'consumption.html'
})
export class ConsumptionPage extends BasePage {

  public consumptionForm: FormGroup;

  private groups: Array<Group>;
  private consumption: Consumption = new Consumption();

  public purposeAmmount = Purpose.Ammount;
  public purposeCounter = Purpose.Counter;  

  public selectedPayerId: number;
  private _selectionCount = 0;

  public unityValue = "";
  public totalValue = "";

  public purposeTitle: PurposeTitle;

  constructor(nav: NavController,
    params: NavParams, 
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    private menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    private recordsProvider: Records,
    private consumptionsProvider: Consumptions) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.consumptionForm = formBuilder.group({
      unit: ['', validateLocaleNumber(this.locale, this.inputCurrencyDigits)],
      total: ['', validateLocaleNumber(this.locale, this.inputCurrencyDigits)]
    });

    this.groups = params.data.groups;
    this.consumption.group = params.data.selectedGroup;
    this.consumption.paid = 0;

    this.purposeTitle = PurposeInfo.Title[this.consumption.group.purpose];    
  }

  ionViewDidLoad() {
    this.loadRecords();
  }

  ionViewWillEnter() {
    this.updateSelectionCount();
  }

  loadRecords() {
    this.showLoading();
    
    this.recordsProvider.load(this.consumption.group.records_url).subscribe(
      (records) => {
        this.hideLoading();

        this.consumption.records = records;
        this.consumption.payerRecord = records[0];
        this.selectedPayerId = records[0].id;

        this.updateSelectionCount();

        this.dataLoaded = true;
      },
      () => {
        this.hideLoading();

        this.errorMessage = "Não foi possível carregar a lista de " + this.purposeTitle.takers + "!";
      });    
  }

  tryAgain() {
    this.ionViewDidLoad();
  }

  editGroup() {
    this.nav.push(GroupAdmPage, {groups: this.groups, consumption: this.consumption});
  }

  choosePayer() {
    this.nav.push(PayersPage, this.consumption);
  }

  get selectionCount(): number {
    return this._selectionCount;
  }

  set selectionCount(value: number) {
    this._selectionCount = value;

    this.calculatePaidValueByUnit();
  }

  recordChanged(target, record) {
    this.selectionCount += (record.took ? 1 : -1);
  }

  updateSelectionCount() {

    if (this.consumption.records) {

      if (this.consumption.group.choose_takers) {
        var count = 0;

        this.consumption.records.forEach(
          record => count += (record.took ? 1 : 0)
        )

        this.selectionCount = count;
      }
      else {
        this.selectionCount = this.consumption.records.length;
      }
    }
  }

  chosenChanged() {
    if (this.consumption.records) {
      this.consumption.payerRecord = this.consumption.records.find(record => record.id == this.selectedPayerId);
    }
  }

  calculatePaidValueByUnit() {
    this.consumption.paid = 0;

    if (this.consumptionForm.value.unit) {
      let val = LocaleParser.Number(this.consumptionForm.value.unit, this.locale.getDefaultLocale());

      if (val) {
        this.consumption.paid = val * this.selectionCount;
        this.totalValue = this.formatCurrency(this.consumption.paid);
      }
    }

    if (this.consumption.paid == 0) {
      this.totalValue = "";
    }    
  }

  calculatePaidValueByTotal() {
    this.consumption.paid = 0;

    if (this.consumptionForm.value.total && (this.selectionCount > 0)) {
      let val = LocaleParser.Number(this.consumptionForm.value.total, this.locale.getDefaultLocale());

      if (val) {
        this.consumption.paid = val;
        this.unityValue = this.formatCurrency(val / this.selectionCount);
      }
    }

    if (this.consumption.paid == 0) {
      this.unityValue = "";
    }
  }

  unitValueChanged($event) {
    this.calculatePaidValueByUnit();
  }

  totalValueChanged($event) {
    this.calculatePaidValueByTotal();
  }

  submit(event: Event) {
    event.preventDefault();

    if ((this.consumption.group.purpose == Purpose.Ammount) && (!this.consumptionForm.valid)) {
      this.showAlert("Digite o valor unitário!");
      return;
    }

    this.confirm("Confirmação", "Você confirma a escolha?", () => {

      setTimeout(() => { this.doRegister(); }, 300);
    });
  }

  doRegister() {
    this.showLoading();

    this.consumptionsProvider.register(this.consumption).subscribe(
      () => {
        this.hideLoading();

        setTimeout(() => { this.nav.pop(); }, 300);
      },
      () => {
        this.hideLoading();

        setTimeout(() => { this.showAlert("Não foi possível registrar!", "Erro"); }, 400);
      });    
  }
}
