import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailSubRoutePage } from '../detail-sub-route/detail-sub-route';

@Component({
  selector: 'page-detail-route',
  templateUrl: 'detail-route.html',
})
export class DetailRoutePage {
selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailRoutePage');
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailSubRoutePage, {
      item: item
    });
  }

}
