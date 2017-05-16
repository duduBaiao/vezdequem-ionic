import {Component} from "@angular/core";
import {NavController, MenuController, AlertController, LoadingController, ModalController} from 'ionic-angular';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {Groups} from '../../providers/groups/groups';
import {Group} from '../../models/group';
import {Config} from '../../providers/config';
import {ConsumptionPage} from '../../pages/consumption/consumption';
import {GroupPage} from '../../pages/group/group';

@Component({
  templateUrl: 'groups.html'
})
export class GroupsPage extends BasePage {

  public groups: Array<Group>;

  constructor(nav: NavController,
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,    
    private groupsProvider: Groups,
    private config: Config) {

    super(nav, alertCtrl, loadingCtrl, locale);
  }

  ionViewDidLoad() {
    this.loadGroups();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
  }
  
  loadGroups() {
    this.showLoading();
    
    this.groupsProvider.load().subscribe(
      (groups) => {
        this.hideLoading();

        this.groups = groups;
        this.dataLoaded = true;
      },
      () => {
        this.hideLoading();

        this.errorMessage = "Não foi possível carregar os grupos!";
      });    
  }

  tryAgain() {
    this.ionViewDidLoad();
  }

  addGroup() {
    let modal = this.modalCtrl.create(GroupPage, {groups: this.groups});
    modal.present();    
  }

  groupSelected(group: Group) {
    this.config.setGroupId(group.id);

    this.nav.push(ConsumptionPage,
      {groups: this.groups, selectedGroup:group});
  }
}
