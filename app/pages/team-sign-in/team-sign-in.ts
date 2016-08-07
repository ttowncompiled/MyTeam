import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayerSignInPage } from '../player-sign-in/player-sign-in';
import { MyData, Team } from '../../providers/my-data/my-data';
/*
  Generated class for the TeamSignInPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/team-sign-in/team-sign-in.html',
})
export class TeamSignInPage {

  constructor(private navCtrl: NavController, public db: MyData) {}

  onSubmit(form: any): void {
    this.db.checkTeamExists(form['teamName']).then((team: Team) => {
      if (team.name != '') {
        this.navCtrl.push(PlayerSignInPage, team);
      }
    });
  }

}
