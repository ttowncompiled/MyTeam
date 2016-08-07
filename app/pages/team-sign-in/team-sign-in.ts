import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayerSignInPage } from '../player-sign-in/player-sign-in';

/*
  Generated class for the TeamSignInPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/team-sign-in/team-sign-in.html',
})
export class TeamSignInPage {

  constructor(private navCtrl: NavController) {}

  onSubmit(form: any): void {
    this.navCtrl.push(PlayerSignInPage, form);
  }

}
