import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { RouteProvider } from '../../providers/route/route';



@Component({
  selector: 'page-detail-sub-route',
  templateUrl: 'detail-sub-route.html',
})
export class DetailSubRoutePage {
  routeList: any[];
  selectedItem :any;
  desaList: any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private routeProvider: RouteProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController
    ) {
      this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      
    var x = this.routeProvider.getDatabyKey(this.selectedItem);
        x.snapshotChanges().subscribe(item=>{
          let arr=[];
          this.routeList=[];
          this.desaList=[];
          item.forEach(element => {
                var y = element.payload.toJSON();
                
                if(element.key=="subRoute"){
                  for(let idx of Object.values(y)){
                    let arr2= [];
                for (let [key, value] of Object.entries(idx)) {  
                    arr2[key]=value; 
                }
                this.desaList.push(arr2);
                }
              }else{
                arr[element.key]=y;
              }
              
                
          });
          this.routeList.push(arr);
          console.log(this.selectedItem);
          console.log(this.desaList);
          console.log(this.routeList);
          loading.dismiss();
        });
  
  }
  antar(){
    const confirm = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Anda yakin ingin mengantar Rastra di rute ini?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //do nothing
          }
        },
        {
          text: 'Ya',
          handler: () => {
             this.routeProvider.updateTrue(this.selectedItem);
              let toast = this.toastCtrl.create({
                      message: "Status Sub Route Berhasil Diupdate !",
                      duration: 5000
                    });
                    toast.present();
          }
        }
      ]
    });
    confirm.present();
   

  }

}
