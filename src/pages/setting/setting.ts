import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
 loginData = {
    email: '',
    username: '',
    photoUrl: '',
    provider:'',
  };
  SelectedUser='';
  pass1='';
  pass2='';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController
    ) {
    
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(auth => {
     // console.log(auth);

     
      if(auth){

        let toast = this.toastCtrl.create({
                      message: "Welcome, "+auth.displayName,
                      duration: 5000
                    });
                    toast.present();
        
        this.loginData.email=auth.email;
        this.loginData.username=auth.displayName;
        this.loginData.provider=auth.providerData[0].providerId;
        if(auth.photoURL!=null){
          this.loginData.photoUrl=auth.photoURL;
        }
        else{
          this.loginData.photoUrl='assets/imgs/logo.png';
        }
      }
        
    });
  }
  edit(){
    this.SelectedUser=this.loginData.username;
  }
  submit(){
    if(this.loginData.provider=="password"){
                if(this.pass1!=this.pass2){
                  let toast = this.toastCtrl.create({
                      message: "Password yang Anda Masukkan Tidak Valid",
                      duration: 5000
                    });
                    toast.present();
                }
                else{
                  console.log('Updated');
                this.updateCurrentUser(this.SelectedUser)
                .then(res => {
                console.log(res);
                }, err => {
                    let toast = this.toastCtrl.create({
                      message: err,
                      duration: 5000
                    });
                    toast.present();
                });
                this.updateCurrentUser2(this.pass1)
                .then(res => {
                this.signOut();

                }, err => {
                    let toast = this.toastCtrl.create({
                      message: err,
                      duration: 5000
                    });
                    toast.present();
                });
                }
        }
        else{
            this.updateCurrentUser(this.loginData)
                .then(res => {
                location.reload();
                this.navCtrl.setRoot(MyApp);
                }, err => {
                    let toast = this.toastCtrl.create({
                      message: err,
                      duration: 5000
                    });
                    toast.present();
                });
         
        }

    
    
  }
  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = this.afAuth.auth.currentUser;
     
      user.updateProfile({
        displayName: value,
        photoURL: user.photoURL
      }).then (res => {
        resolve(res)
        
      }, err => reject(err));
    })
  }
  updateCurrentUser2(value){
    return new Promise<any>((resolve, reject) => {
       var user = this.afAuth.auth.currentUser;
      user.updatePassword(value).then (res => {
        resolve(res)
      }, err => reject(err));
     
    })
  }
   signOut() {
    this.afAuth.auth.signOut();
  }

  
}
