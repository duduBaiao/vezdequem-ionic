import {Component} from '@angular/core';
import {NavController, NavParams, MenuController, AlertController, LoadingController, ViewController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {LocaleService} from 'angular2localization/angular2localization';
import {BasePage} from '../../common/pages/base-page';
import {Groups} from '../../providers/groups/groups';
import {Group} from '../../models/group';
import {Purpose} from '../../models/purpose';

@Component({
  templateUrl: 'group.html'
})
export class GroupPage extends BasePage {

  private groups: Array<Group>;

  public groupForm: FormGroup;

  public registerAmmount = true;
  public chooseTakers = true;

  constructor(nav: NavController,
    params: NavParams, 
    alertCtrl: AlertController,
    loadingCtrl: LoadingController,
    locale: LocaleService,
    private menuCtrl: MenuController,
    private viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    private groupsProvider: Groups) {

    super(nav, alertCtrl, loadingCtrl, locale);

    this.groups = params.data.groups;

    this.groupForm = formBuilder.group({
      name: ['', Validators.required]
    });
  }

  submit(event: Event) {
    event.preventDefault();

    if (!this.groupForm.valid) {
      this.showAlert("Digite o nome do grupo!");
      return;
    }

    this.showLoading();

    this.groupsProvider.add(
      this.groupForm.value.name.trim(),
      (this.registerAmmount ? Purpose.Ammount : Purpose.Counter),
      this.chooseTakers).subscribe(
        (group) => {
          this.hideLoading();

          this.groups.push(group);

          setTimeout(() => { this.dismiss(); }, 400);
        },
        () => {
          this.hideLoading();

          setTimeout(() => { this.showAlert("Não foi possível cadastrar o grupo!", "Erro"); }, 400);
        });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }    
}