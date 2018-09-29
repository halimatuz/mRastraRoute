import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingPage } from '../pages/setting/setting';
import { DetailRoutePage } from '../pages/detail-route/detail-route';
import { DetailSubRoutePage } from '../pages/detail-sub-route/detail-sub-route';
import { SlidePage } from '../pages/slide/slide';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingPage,
    DetailRoutePage,
    DetailSubRoutePage,
    SlidePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingPage,
    DetailRoutePage,
    DetailSubRoutePage,
    SlidePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
