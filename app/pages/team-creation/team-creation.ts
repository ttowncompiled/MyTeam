import { Component } from '@angular/core';
import { Alert, AlertController, NavController } from 'ionic-angular';
import { Database, Team } from '../../providers/my-data/my-data';
import { PlayerCreationPage } from '../player-creation/player-creation';
import { PlayerSignInPage } from '../player-sign-in/player-sign-in';

/*
  Generated class for the TeamCreationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/team-creation/team-creation.html',
})
export class TeamCreationPage {

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, public db: Database) {}

  onSubmit(form: { teamName: string }): void {
    this.db.createNewTeam(form.teamName).then((team: Team) => {
      console.log('team-creation', 'onSubmit', '>>>', team);
      if (team) this.navCtrl.push(PlayerCreationPage, { teamID: team.teamID, isAdmin: true });
      else this.alertThatTeamAlreadyExists(form.teamName);
    });
  }

  alertThatTeamAlreadyExists(teamName: string): void {
    let alert: Alert = this.alertCtrl.create({
      title: 'Team Already Exists!',
      message: 'Would you like to sign in?',
      buttons: [
        {
          text: 'NO'
        },
        {
          text: 'YES',
          handler: () => {
            this.db.checkIfTeamExists(teamName).then((team: Team) => {
              if (team) this.navCtrl.push(PlayerSignInPage, { teamID: team.teamID });
              else this.alertThatCouldNotSignIn();
            });
          }
        }
      ]
    });
    alert.present();
  }

  alertThatCouldNotSignIn(): void {
    this.alertCtrl.create({
      title: 'Sorry!',
      message: 'Could not sign into this team.',
      buttons: ['OK']
    })
    .present();
  }

}
