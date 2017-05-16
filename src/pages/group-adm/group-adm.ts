import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, ModalController} from 'ionic-angular';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {GroupsPage} from '../../pages/groups/groups';
import {Groups} from '../../providers/groups/groups';
import {Records} from '../../providers/records/records';
import {Group} from '../../models/group';
import {Purpose, PurposeTitle, PurposeInfo} from '../../models/purpose';
import {Consumption} from '../../models/consumption';
import {Record} from '../../models/record';
import {Config} from '../../providers/config';
import {ParticipantPage} from '../../pages/participant/participant';

@Component({
  templateUrl: 'group-adm.html'
})
export class GroupAdmPage extends BasePage {

  private groups: Array<Group>;
  public consumption: Consumption;
  public sortedRecords: Array<Record>;

  public purposeAmmount = Purpose.Ammount;
  public purposeCounter = Purpose.Counter;

  public purposeTitle: PurposeTitle;

  constructor(nav: NavController,
    params: NavParams, 
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    private modalCtrl: ModalController,
    private groupsProvider: Groups,
    private recordsProvider: Records,
    private config: Config) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.groups = params.data.groups;
    this.consumption = params.data.consumption;

    this.purposeTitle = PurposeInfo.Title[this.consumption.group.purpose];
  }

  refreshParticipants() {

    this.sortedRecords = this.consumption.records
      .slice()
      .sort((a, b) => this.consumption.group.purpose == Purpose.Ammount ?
        b.paid - a.paid :
        b.paid_count - a.paid_count);
  }

  ionViewWillEnter() {
    this.refreshParticipants();
  }

  editGroup() {
    setTimeout(() => { this.doEditGroup(); }, 200);
  }

  doEditGroup() {

    this.prompt("Editar Grupo", "", "Nome", data => {
      let name = data.value;

      if (name.trim().length == 0) {
        this.showAlert("O nome do grupo não pode ficar vazio!");
        return;
      }

      this.showLoading();

      this.groupsProvider.edit(this.consumption.group, name).subscribe((group) => {
        this.hideLoading();

        this.consumption.group.name = group.name;
      },
      () => {
        this.hideLoading();

        setTimeout(() => { this.showAlert("Não foi possível atualizar o grupo!", "Erro"); }, 400);
      });
    },
    this.consumption.group.name);    
  }

  removeRecord(record: Record) {
    setTimeout(() => { this.doRemoveRecord(record); }, 200);
  }

  doRemoveRecord(record: Record) {

    let isRemovingSelf = (record.user.id == this.config.session().user_id);

    let message = isRemovingSelf ?
      "Tem certeza de que deseja sair do grupo '" + this.consumption.group.name + "'?" :
      "Tem certeza de que deseja remover '" + record.user.nick_name + "'?";

    this.confirm("Confirmação", message, () => {

      this.showLoading();

      this.recordsProvider.remove(record).subscribe(() => {
          this.hideLoading();

          if (isRemovingSelf) {
            let index = this.groups.indexOf(this.consumption.group);
            this.groups.splice(index, 1);

            setTimeout(() => { this.nav.setRoot(GroupsPage, null, {animate: true}); }, 400);
          }
          else {
            let index = this.consumption.records.indexOf(record);
            this.consumption.records.splice(index, 1);

            this.refreshParticipants();
          }
        },
        () => {
          this.hideLoading();

          setTimeout(() => { this.showAlert("Não foi possível remover o participante!", "Erro"); }, 400);
        });
    });    
  }

  addParticipant() {
    let modal = this.modalCtrl.create(ParticipantPage, {consumption: this.consumption});
    modal.onDidDismiss(() => { this.refreshParticipants(); });
    modal.present();
  }
}
