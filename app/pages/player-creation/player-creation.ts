import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Team } from '../../providers/my-data/my-data';
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

  constructor(private navCtrl: NavController, navParams: NavParams) {
    var { team, isAdmin } = navParams.data;
    this.team = team;
    this.isAdmin = isAdmin;
  }

}
