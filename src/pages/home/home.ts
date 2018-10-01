import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import { DetailRoutePage } from '../detail-route/detail-route';

import { GudangProvider } from '../../providers/gudang/gudang';
import { Gudang } from '../../providers/gudang/gudang.model';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  gudangList: Gudang[];
  loading:any;
  constructor(
    public navCtrl: NavController,
    private gudangProvider: GudangProvider,
    
    public loadingCtrl: LoadingController
    ) {
      //read gudang
       
        
  }
  ionViewDidLoad() {
     this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
    var x = this.gudangProvider.getData();
        x.snapshotChanges().subscribe(item => {
      this.gudangList= [];
      item.forEach(element => {
        
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.gudangList.push(y as Gudang);
      });
      this.loading.dismiss();
            
    });

  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailRoutePage, {
      item: item

    });
  }
}
