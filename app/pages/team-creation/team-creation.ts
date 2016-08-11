import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Database, Team } from '../../providers/my-data/my-data';
import { PlayerCreationPage } from '../player-creation/player-creation';

/*
  Generated class for the TeamCreationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/team-creation/team-creation.html',
})
export class TeamCreationPage {

  constructor(private navCtrl: NavController, public db: Database) {}

  onSubmit(form: { teamName: string }): void {
    this.db.createNewTeam(form.teamName).then((team: Team) => {
      console.log('team-creation', 'onSubmit', '>>>', team);
      if (team) this.navCtrl.push(PlayerCreationPage, { teamID: team.teamID, isAdmin: true });
      else {
        // inform user that their team already exists
      }
    });
  }

}
