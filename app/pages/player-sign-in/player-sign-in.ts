import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthState, Database, Team, TeamID } from '../../providers/my-data/my-data';
import { Observable } from 'rxjs';
import { PlayerCreationPage } from '../player-creation/player-creation';
import { CapitalCasePipe } from '../../pipes/capital-case';

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
  teamName: Observable<string>;
  playerCreationPage: any = PlayerCreationPage;

  constructor(private navCtrl: NavController, public db: Database, params: NavParams) {
    console.log('player-sign-in-page', 'constructor', '>>>', params.data);
    this.teamID = (<TeamID> params.get('teamID'));
    this.teamName = this.db.onTeam(this.teamID).map((team: Team) => team.name);
  }

  onSubmit(form: { email: string, password: string }): void {
    this.db.auth(this.teamID, form.email, form.password)
      .then((a: AuthState) => {
        console.log('player-sign-in', 'onSubmit', '>>>', a);
        if (a) {
          // direct user to their home page
        } else {
          // inform user that they failed to auth
        }
      });
  }

}
