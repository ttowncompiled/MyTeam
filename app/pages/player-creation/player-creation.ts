import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyData, PlayerStamp, Team } from '../../providers/my-data/my-data';
import { CapitalCasePipe } from '../../pipes/capital-case';

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

  team: Team;
  isAdmin: string;

  constructor(private navCtrl: NavController, public db: MyData, navParams: NavParams) {
    let { team, isAdmin } = navParams.data;
    this.team = team;
    this.isAdmin = isAdmin;
  }

  onSubmit(form: any): void {
    console.log(form);
    if (form['password'] == form['confirm']) {
      delete form['confirm'];
      form['phone'] = `(${form['phone'].substring(0, 3)}) ${form['phone'].substring(3, 6)}-${form['phone'].substring(6)}`;
      form['teamID'] = this.team.teamID;
      this.db.addPlayer(form).then((player: PlayerStamp) => console.log(player));
    }
  }

}
