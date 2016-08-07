import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseApp } from 'angularfire2';
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
  teamID: string;
  name: string;
}

export interface Player {

}

export abstract class Database {
  abstract isUserAuthed(): Promise<AuthState>;
  abstract auth(creds: Creds): Promise<AuthState>;
  abstract unauth();
  abstract checkTeamExists(teamName: string): Promise<Team>;
  abstract addTeam(teamName: string): Promise<Team>;
  abstract addPlayer();
}

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyData extends Database {

  constructor(public af: AngularFire, @Inject(FirebaseApp) public fb: any) {
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

  checkTeamExists(teamName: string): Promise<Team> {
    return new Promise<Team>((resolve: any, reject: any) => {
      this.fb.database().ref('/teams').once('value').then((snap: any) => {
        if (snap == null || snap.val() == null) {
          resolve({ teamID: '', name: '' });
        } else {
          var teams: Team[] = Object.keys(snap.val()).map((teamID: string) => snap.val()[teamID]);
          teams = teams.filter((team: Team) => team.name == teamName);
          if (teams.length == 0) {
            resolve({ teamID: '', name: '' });
          } else {
            resolve(teams[0]);
          }
        }
      });
    });
  }

  addTeam(teamName: string): Promise<Team> {
    return new Promise<Team>((resolve: any, reject: any) => {
      this.checkTeamExists(teamName).then((t: Team) => {
        if (t.teamID != '') {
          reject(t);
        } else {
          var { ref, teamID } = this.newTeamRef();
          var team: Team = { teamID: teamID, name: teamName };
          ref.set(team).then(() => {
            resolve(team);
          });
        }
      });
    });
  }

  addPlayer() {

  }

  private newTeamRef(): { ref: any, teamID: string } {
    var ref: any = this.fb.database().ref('/teams').push();
    var parts: string[] = (<string> ref.toString()).split('/');
    var teamID: string = parts[parts.length-1];
    return { ref: ref, teamID: teamID };
  }

}

