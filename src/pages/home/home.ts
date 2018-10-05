import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import { DetailRoutePage } from '../detail-route/detail-route';

import { GudangProvider } from '../../providers/gudang/gudang';
import { Gudang } from '../../providers/gudang/gudang.model';

import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  gudangList: Gudang[];
  loading:any;
  distance: any[];
  constructor(
    public navCtrl: NavController,
    private gudangProvider: GudangProvider,
    private http: HttpClient,
    public loadingCtrl: LoadingController
    ) {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.InitializeDistance().then(res => {
        if(res){
          this.loading.dismiss();
          
        }
      });
       
        
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
      
      
            
    });

  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    if(this.distance.length>0){
      this.navCtrl.push(DetailRoutePage, {
      item: item,
      koor : this.distance
    });
    }
    
  }
  //mengambil data jarak json
  public getJSON(): Observable<any> {
        return this.http.get("./assets/data/Koordinat.json")
    }
//menyimpan data jarak json in array
  InitializeDistance(){
return new Promise((resolve,reject) =>{
    
 let i=0;
    this.distance=[];
    this.getJSON().subscribe(data => {
      data.forEach(item =>{
        
        this.distance[i]=item['koor'];
         i++;
      });
       return resolve(true);
        });
});

}
}
