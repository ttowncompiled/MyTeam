import { Component, Inject } from '@angular/core';
import { Alert, AlertController, NavController } from 'ionic-angular';
import { Database, Team } from '../../providers/my-data/my-data';
import { PlayerSignInPage } from '../player-sign-in/player-sign-in';
import { PlayerCreationPage } from '../player-creation/player-creation';

/*
  Generated class for the TeamSignInPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/team-sign-in/team-sign-in.html',
})
export class TeamSignInPage {

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, public db: Database) {}

  onSubmit(form: { teamName: string }): void {
    this.db.checkIfTeamExists(form.teamName.toLowerCase()).then((team: Team) => {
      console.log('team-sign-in-page', 'onSubmit', '>>>', team);
      if (team) this.navCtrl.push(PlayerSignInPage, { teamID: team.teamID });
      else this.alertThatTeamDoesNotExist(form.teamName);
    });
  }

  alertThatTeamDoesNotExist(teamName: string): void {
    let alert: Alert = this.alertCtrl.create({
      title: 'Team Does Not Exist!',
      message: 'Would you like to create this team?',
      buttons: [
        {
          text: 'NO'
        },
        {
          text: 'YES',
          handler: () => {
            this.db.createNewTeam(teamName).then((team: Team) => {
              console.log('team-sign-in', 'alertThatTeamDoesNotExist', '>>>', team);
              if (team) this.navCtrl.push(PlayerCreationPage, { teamID: team.teamID, isAdmin: true });
              else {
                alert.dismiss();
                this.alertThatTeamCouldNotBeCreated();
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  alertThatTeamCouldNotBeCreated(): void {
    this.alertCtrl.create({
      title: 'Sorry!',
      message: 'This team could not be created.',
      buttons: ['OK']
    })
    .present();
  }

}
