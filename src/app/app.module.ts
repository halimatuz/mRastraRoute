import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingPage } from '../pages/setting/setting';
import { DetailRoutePage } from '../pages/detail-route/detail-route';
import { DetailSubRoutePage } from '../pages/detail-sub-route/detail-sub-route';
import { SlidePage } from '../pages/slide/slide';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GudangProvider } from '../providers/gudang/gudang';

import { HttpClientModule } from '@angular/common/http';
import { RouteProvider } from '../providers/route/route';

var config = {
    apiKey: "AIzaSyCqZWcPHg7kwaldRzKcmS5Hs1pUkjSolb0",
    authDomain: "rastraroute.firebaseapp.com",
    databaseURL: "https://rastraroute.firebaseio.com",
    projectId: "rastraroute",
    storageBucket: "rastraroute.appspot.com",
    messagingSenderId: "977299048739"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingPage,
    DetailRoutePage,
    DetailSubRoutePage,
    SlidePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingPage,
    DetailRoutePage,
    DetailSubRoutePage,
    SlidePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GudangProvider,
    RouteProvider,
  ]
})
export class AppModule {}
