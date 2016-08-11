import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Database, Player, Registration, Team, TeamID } from '../../providers/my-data/my-data';
import { Observable } from 'rxjs';
import { CapitalCasePipe } from '../../pipes/capital-case';
import { HomePage } from '../home/home';
import { PlayerSignInPage } from '../player-sign-in/player-sign-in';

interface Form {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
}

/*
  Generated class for the PlayerCreationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/player-creation/player-creation.html',
  pipes: [ CapitalCasePipe ]
})
export class PlayerCreationPage {

  teamID: TeamID;
  isAdmin: boolean;
  teamName: Observable<string>;

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, public db: Database, params: NavParams) {
    console.log('player-creation', 'constructor', '>>>', params.data);
    this.teamID = (<TeamID> params.get('teamID'));
    this.isAdmin = (<boolean> params.get('isAdmin'));
    this.teamName = this.db.onTeam(this.teamID).map((team: Team) => team.name);
  }

  onSubmit(form: Form): void {
    console.log('player-creation', 'onSubmit', '>>>', form);
    if (form.password == form.confirm) {
      let reg: Registration = {
        confirm: form.confirm,
        dob: form.dob,
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password,
        phone: form.phone,
        teamID: this.teamID
      };
      this.db.createNewPlayer(reg).then((player: Player) => {
        console.log('player-creation', 'onSubmit', '>>>', player);
        if (player) this.navCtrl.push(HomePage, player);
        else this.alertThatEmailIsInUse(reg.teamID, reg.email);
      });
    } else this.alertThatPasswordsDontMatch();
  }

  alertThatPasswordsDontMatch(): void {
    this.alertCtrl.create({
      title: "Passwords Don't Match!",
      message: 'Please re-enter your Password.',
      buttons: ['TRY AGAIN']
    })
    .present();
  }

  alertThatEmailIsInUse(teamID: TeamID, email: string): void {
    this.alertCtrl.create({
      title: 'Email already in Use!',
      message: 'Would you like to sign in?',
      buttons: [
        {
          text: 'NO'
        },
        {
          text: 'YES',
          handler: () => this.navCtrl.push(PlayerSignInPage, { teamID: teamID, email: email })
        }
      ]
    })
    .present();
  }

}
