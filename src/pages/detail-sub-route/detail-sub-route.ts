import { Component,  ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { RouteProvider } from '../../providers/route/route';



declare var google;


@Component({
  selector: 'page-detail-sub-route',
  templateUrl: 'detail-sub-route.html',
})
export class DetailSubRoutePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  routeList: any[];
  selectedItem :any;
  desaList: any[];
  selectedKoor : any [];
  routeidx : number[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private routeProvider: RouteProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    
    ) {
      this.selectedItem = navParams.get('item');
      this.selectedKoor = navParams.get('koor');
    
      
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
          this.routeidx=[];
          this.routeidx.push(this.routeList[0]['fgudang']);
          for(let b=0; b<this.desaList.length;b++){
            let num=7+this.desaList[b]['index'];
            this.routeidx.push(num);
          }

          this.initMap();
          loading.dismiss();
        });
  
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: this.ShowRoute(this.selectedKoor[this.routeidx[0]],this.selectedKoor[this.routeidx[1]])
    });

    this.directionsDisplay.setMap(this.map);
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
  ShowRoute(org : string, dest : string) {
    this.directionsService.route({
      origin: org,
      destination: dest,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  
}
