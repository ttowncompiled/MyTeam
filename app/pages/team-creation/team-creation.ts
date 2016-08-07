import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyData, Team } from '../../providers/my-data/my-data';
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

  constructor(private navCtrl: NavController, public db: MyData) {}

  onSubmit(form: any): void {
    var teamName: string = (<string> form['teamName']).toLowerCase();
    this.db.addTeam(teamName).then((team: Team) => {
      this.navCtrl.push(PlayerCreationPage, { 'team': team, 'isAdmin': true });
    });
  }

}
