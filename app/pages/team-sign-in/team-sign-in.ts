import { Component, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayerSignInPage } from '../player-sign-in/player-sign-in';
import { Database, Team } from '../../providers/my-data/my-data';

/*
  Generated class for the TeamSignInPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/team-sign-in/team-sign-in.html',
})
export class TeamSignInPage {

  constructor(private navCtrl: NavController, public db: Database) {}

  onSubmit(form: { teamName: string }): void {
    this.db.checkIfTeamExists(form.teamName.toLowerCase()).then((team: Team) => {
      console.log('team-sign-in-page', 'onSubmit', '>>>', team);
      if (team) this.navCtrl.push(PlayerSignInPage, { teamID: team.teamID });
      else {
        // inform user that team does not exist
      }
    });
  }

}
