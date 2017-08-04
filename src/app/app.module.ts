import {NgModule, ErrorHandler} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LocaleModule, LocaleService} from 'angular2localization/angular2localization';

import {MyApp} from './app.component';

import {Config, configFactory} from '../providers/config';
import {Login} from '../providers/login/login';
import {Groups} from '../providers/groups/groups';
import {Consumptions} from '../providers/consumptions/consumptions';
import {Records} from '../providers/records/records';
import {Users} from '../providers/users/users';

import {TryAgainComponent} from '../common/components/try-again.component';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {RegisterPage} from '../pages/register/register';
import {RecoverPasswordPage} from '../pages/recover-password/recover-password';
import {GroupsPage} from '../pages/groups/groups';
import {ConsumptionPage} from '../pages/consumption/consumption';
import {GroupPage} from '../pages/group/group';
import {PayersPage} from '../pages/payers/payers';
import {GroupAdmPage} from '../pages/group-adm/group-adm';
import {ParticipantPage} from '../pages/participant/participant';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    LocaleModule.forRoot(),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {backButtonText: ''})
  ],  
  declarations: [
    MyApp,
    TryAgainComponent,
    LoginPage,
    ProfilePage,
    RegisterPage,
    RecoverPasswordPage,
    GroupsPage,
    ConsumptionPage,
    GroupPage,
    PayersPage,
    GroupAdmPage,
    ParticipantPage
  ],
  entryComponents: [
    MyApp,
    LoginPage,
    ProfilePage,
    RegisterPage,
    RecoverPasswordPage,
    GroupsPage,
    ConsumptionPage,
    GroupPage,
    PayersPage,
    GroupAdmPage,
    ParticipantPage
  ],
  providers: [
    LocaleService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Config, useFactory: configFactory, deps: [Storage]},
    Login,
    Groups,
    Consumptions,
    Records,
    Users
  ],
  bootstrap: [IonicApp]  
})
export class AppModule {}