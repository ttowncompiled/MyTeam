import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { AuthState, Database, Player, Team, TeamID } from '../../providers/my-data/my-data';
import { Observable } from 'rxjs';
import { CapitalCasePipe } from '../../pipes/capital-case';
import { PlayerCreationPage } from '../player-creation/player-creation';
import { HomePage } from '../home/home';

/*
  Generated class for the PlayerSignInPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/player-sign-in/player-sign-in.html',
  pipes: [ CapitalCasePipe ]
})
export class PlayerSignInPage {

  teamID: TeamID;
  signInForm: FormGroup;
  teamName: Observable<string>;
  playerCreationPage: any = PlayerCreationPage;

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, public db: Database, params: NavParams) {
    console.log('player-sign-in-page', 'constructor', '>>>', params.data);
    this.teamID = (<TeamID> params.get('teamID'));
    this.signInForm = new FormGroup({
      email: new FormControl(params.get('email') ? (<string> params.get('email')) : ''),
      password: new FormControl('')
    });
    this.teamName = this.db.onTeam(this.teamID).map((team: Team) => team.name);
  }

  onSubmit(form: { email: string, password: string }): void {
    this.db.auth(this.teamID, form.email, form.password)
      .then((a: AuthState) => {
        console.log('player-sign-in', 'onSubmit', '>>>', a);
        if (a) {
          let player: Player = {
            email: form.email,
            playerID: a.playerID,
            teamID: this.teamID
          };
          this.navCtrl.push(HomePage, player);
        }
        else this.alertThatAuthenticationFailed();
      });
  }

  alertThatAuthenticationFailed(): void {
    this.alertCtrl.create({
      title: 'Authentication Failed!',
      message: 'Username or Password is incorrect.',
      buttons: ['TRY AGAIN']
    })
    .present();
  }

}
