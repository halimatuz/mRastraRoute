import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingPage } from '../pages/setting/setting';
import { SlidePage } from '../pages/slide/slide';
//import { LoginPage } from '../pages/login/login';

import { AngularFireAuth } from 'angularfire2/auth';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any =HomePage;

  pages: Array<{title: string, component: any, icon:string}>;
  loginData = {
    email: '',
    username: '',
    photoUrl: '',
  }
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth

    ) {
    this.afAuth.authState.subscribe(auth => {
      
      if(!auth)
        this.rootPage = SlidePage;
      else{
        this.loginData.email=auth.email;
        this.loginData.username=auth.displayName;
        if(auth.photoURL!=null){
          this.loginData.photoUrl=auth.photoURL;
        }
        else{
          this.loginData.photoUrl='assets/imgs/logo.png';
        }
        this.rootPage = HomePage;
      }
        
    });
    
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon:'home'},
      { title: 'Setting', component: SettingPage, icon:'settings' },
      { title: 'Log Out', component: SlidePage, icon:'log-out' }
    ];
   
  }
  ionViewDidLoad() {
    this.afAuth.authState.subscribe(auth => {
      
      if(!auth)
        this.rootPage = SlidePage;
      else{
        this.loginData.email=auth.email;
        this.loginData.username=auth.displayName;
        if(auth.photoURL!=null){
          this.loginData.photoUrl=auth.photoURL;
        }
        else{
          this.loginData.photoUrl='assets/imgs/logo.png';
        }
        this.rootPage = HomePage;
      }
        
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title=='Log Out'){
      this.signOut();
      this.nav.setRoot(page.component);
    }else
    this.nav.setRoot(page.component);
  }
   signOut() {
    this.afAuth.auth.signOut();
  }
}
