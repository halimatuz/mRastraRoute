import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DetailSubRoutePage } from '../detail-sub-route/detail-sub-route';

import { RouteProvider } from '../../providers/route/route';
import { Route } from '../../providers/route/route.model';


@Component({
  selector: 'page-detail-route',
  templateUrl: 'detail-route.html',
})
export class DetailRoutePage {
selectedItem: any;
selectedKoor: any[];
routeListTrue: Route[];
routeListFalse: Route[];
desaTrue: string[];
desaFalse: string[];
lengthTrue : number[];
lengthFalse : number[];
data='Delivered';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private routeProvider: RouteProvider,
    public loadingCtrl: LoadingController,
    
    ) {
    this.selectedItem = navParams.get('item');
    this.selectedKoor = navParams.get('koor');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
    var a = this.routeProvider.getData();
            a.snapshotChanges().subscribe(item => {
              this.routeListTrue= [];
              this.routeListFalse= [];
              this.desaTrue=[];
              this.desaFalse=[];
              this.lengthTrue=[];
              this.lengthFalse=[];
              item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                if(y["fgudang"]==this.selectedItem){
                  let desa='';
                  let length=0;
                  let first=true;
                  for(let idx of Object.values(y["subRoute"])){
                    
                    if(first)
                      desa+=idx.desa; 
                      else
                      desa=desa+"-"+idx.desa;
                      first=false;
                    length++;
                    
                  }
                  if(y["isDelivered"]==true){
                    this.routeListTrue.push(y as Route);
                    this.desaTrue.push(desa);
                    this.lengthTrue.push(length);
                  }
                  
                  else{
                    this.routeListFalse.push(y as Route);
                    this.desaFalse.push(desa);
                    this.lengthFalse.push(length);
                  }
                  
                }
                
              });
              loading.dismiss();
              
            });
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    if(this.selectedKoor.length>0){
    this.navCtrl.push(DetailSubRoutePage, {
      item: item,
      koor: this.selectedKoor
    });
    }
  }

}
