import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailRoutePage } from '../detail-route/detail-route';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailRoutePage, {
      item: item
    });
  }
}
