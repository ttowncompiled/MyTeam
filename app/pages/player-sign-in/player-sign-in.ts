import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

/*
  Generated class for the PlayerSignInPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/player-sign-in/player-sign-in.html',
})
export class PlayerSignInPage {

  teamName: string;

  constructor(private navCtrl: NavController, public af: AngularFire, navParams: NavParams) {
    this.teamName = navParams.get('team-name');
  }

  onSubmit(form: any): void {
    this.af.auth.login(form).then((a: FirebaseAuthState) => {
      console.log(a);
    }, (a: Object) => {
      console.error(a);
    }).catch((a: Object) => {
      console.error(a);
    });
  }

}
