import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PlayerCreationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/player-creation/player-creation.html',
})
export class PlayerCreationPage {

  teamName: string;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.teamName = navParams.get('team-name');
  }

}
