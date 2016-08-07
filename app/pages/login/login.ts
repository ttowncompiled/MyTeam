import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { FormControl } from '@angular/forms';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');

  constructor(private navCtrl: NavController, public af: AngularFire) {}

  onSignIn(value: any): void {
    console.log(value);
    this.af.auth.login(value).then((a: FirebaseAuthState) => {
      console.log(a);
    }, (a: Object) => {
      console.log(a);
    });
  }

}
