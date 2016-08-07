import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TeamSignInPage } from '../team-sign-in/team-sign-in';
import { TeamCreationPage } from '../team-creation/team-creation';

/*
  Generated class for the LandingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/landing/landing.html',
})
export class LandingPage {

  teamSignInPage: any = TeamSignInPage;
  teamCreationPage: any = TeamCreationPage;

  constructor(private navCtrl: NavController) {}

}
