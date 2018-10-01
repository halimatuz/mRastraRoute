import { Component } from '@angular/core';
import { NavController, NavParams,ToastController  } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData = {
    email: '',
    password: '',
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
     private afAuth: AngularFireAuth, 
     private toastCtrl: ToastController) {
  }

  
   login() {
     this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
        .then(auth => {
          // Do custom things with auth
          this.navCtrl.setRoot(MyApp);
        })
        .catch(err => {
          // Handle error
          let toast = this.toastCtrl.create({
            message: err.message,
            duration: 5000
          });
          toast.present();
        });
    }

}
