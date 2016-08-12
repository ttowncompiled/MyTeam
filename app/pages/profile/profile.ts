import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {

  tabID: number;

  constructor(private navCtrl: NavController, params: NavParams) {
    this.tabID = (<number> params.get('tabID'));
  }

  swipeEvent(direction: number): void {
    if (direction == 2 && this.tabID < this.navCtrl.parent._tabs.length-1) this.navCtrl.parent.select(this.tabID + 1);
    if (direction == 4 && this.tabID > 0) this.navCtrl.parent.select(this.tabID - 1);
  }

}
