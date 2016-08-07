import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyData, AuthState } from '../../providers/my-data/my-data';
import { PlayerCreationPage } from '../player-creation/player-creation';
/*
  Generated class for the PlayerSignInPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/player-sign-in/player-sign-in.html',
})
export class PlayerSignInPage {

  teamName: string;
  playerCreationPage: any = PlayerCreationPage;

  constructor(private navCtrl: NavController, public db: MyData, navParams: NavParams) {
    this.teamName = navParams.get('team-name');
  }

  onSubmit(form: any): void {
    this.db.auth(form).then((a: AuthState) => {
      console.log(a);
    }).catch((a: AuthState) => {
      console.error(a);
    });
  }

}
