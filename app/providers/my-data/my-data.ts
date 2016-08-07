import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import 'rxjs/add/operator/map';

export interface Creds {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthed: boolean;
  uid: string;
}

export interface Team {

}

export interface Player {

}

export abstract class Database {
  abstract isUserAuthed(): Promise<AuthState>;
  abstract auth(creds: Creds): Promise<AuthState>;
  abstract unauth();
  abstract addTeam();
  abstract addPlayer();
}

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyData extends Database {

  constructor(public af: AngularFire) {
    super();
  }

  isUserAuthed(): Promise<AuthState> {
    return new Promise<AuthState>((resolve: any, reject: any) => {
      resolve({ isAuthed: false, uid: '' });
    });
  }

  auth(creds: Creds): Promise<AuthState> {
    return new Promise<AuthState>((resolve: any, reject: any) => {
      this.af.auth.login(creds).then((a: FirebaseAuthState) => {
        resolve({ isAuthed: true, uid: a.uid });
      }, (a: Object) => {
        reject({ isAuthed: false, uid: '' });
      }).catch((a: Object) => {
        reject({ isAuthed: false, uid: '' });
      });
    });
  }

  unauth() {

  }

  addTeam() {

  }

  addPlayer() {

  }

}

