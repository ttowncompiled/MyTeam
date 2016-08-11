import { Injectable, Inject } from '@angular/core';
import { FirebaseAuthState, FirebaseApp } from 'angularfire2';
import { Observable, Subscriber } from 'rxjs';
import 'rxjs/add/operator/map';

export interface AuthState {
  playerID: string;
}

export interface Team {
  teamID: string;
  name: string;
}

export interface Registration {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  password: string;
  teamID: string;
}

export interface Stamp {
  playerID: string;
  teamID: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
}

export abstract class Database {
  abstract isUserAuthed(): Observable<AuthState>;
  abstract checkIfTeamExists(name: string): Observable<Team>;
  abstract auth(email: string, password: string): Promise<AuthState>;
  abstract unauth(): Promise<boolean>;
  abstract addTeam(teamName: string): Promise<TeamID>;
  abstract getTeamName(teamID: string): Promise<string>;
  abstract checkIfPlayerExists(teamID: string, email: string): Promise<Stamp>;
  abstract addPlayer(player: Registration): Promise<Stamp>;
}

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyData extends Database {

  static VAL: string = 'value';
  static TEAMS: string = '/teams';

  constructor(@Inject(FirebaseApp) public fb: firebase.app.App) {
    super();
  }

  isUserAuthed(): Observable<AuthState> {
    return Observable.merge<firebase.User>(
        Observable.of<firebase.User>(this.fb.auth().currentUser),
        new Observable<firebase.User>((subscriber: Subscriber<firebase.User>) => {
          this.fb.auth().onAuthStateChanged((user: firebase.User) => {
            subscriber.next(user);
          });
        })
    )
    .map<AuthState>((user: firebase.User) => user ? { playerID: user.uid } : null);
  }

  checkIfTeamExists(name: string): Observable<Team> {
    type TeamSnap = { [teamID: string]: Team };
    return Observable.fromPromise<TeamSnap>(this.fb.database().ref(MyData.TEAMS).once(MyData.VAL))
      .flatMap<Team>((snap: TeamSnap) => {
        if (snap == null) return null;
        return Observable.from<string>(Object.keys(snap))
          .map<Team>((teamID: string) => snap[teamID])
          .filter((team: Team) => team.name == name)
          .toArray()
          .map<Team>((teams: Team[]) => teams.length == 1 ? teams[0] : null)
          .flatMap<Team>((team: Team) => {
            if (team == null) return null;
            return new Observable<Team>((subscriber: Subscriber<Team>) => {
              this.fb.database().ref(`${MyData.TEAMS}/${team.teamID}`).on(MyData.VAL, (snap: firebase.database.DataSnapshot) => {
                subscriber.next(snap ? (<Team> snap.val()) : null);
              });
            });
          });
      });
  }

  auth(creds: Credentials): Promise<AuthState> {
    return new Promise<AuthState>((resolve: any, reject: any) => {
      this.fb.auth().signInWithEmailAndPassword(creds.email, creds.password).then((a: FirebaseAuthState) => {
        resolve({ isAuthed: true, uid: a.uid });
      }).catch((a: Object) => {
        reject({ isAuthed: false, uid: '' });
      });
    });
  }

  unauth(): void {
    this.fb.auth().signOut();
  }

  addTeam(teamName: string): Promise<TeamStamp> {
    return new Promise<TeamStamp>((resolve: any, reject: any) => {
      this.checkIfTeamExists(teamName).then((t: TeamStamp) => {
        if (t.teamID != '') {
          reject(t);
        } else {
          let { ref, teamID } = this.newTeamRef();
          let team: TeamStamp = { teamID: teamID, name: teamName };
          ref.set(team).then(() => {
            resolve(team);
          });
        }
      });
    });
  }

  checkIfPlayerExists(teamID: string, email: string): Promise<PlayerStamp> {
    return new Promise<PlayerStamp>((resolve: any, reject: any) => {

    });
  }

  addPlayer(reg: Registration): Promise<PlayerStamp> {
    return new Promise<PlayerStamp>((resolve: any, reject: any) => {
      let { ref, playerID } = this.newPlayerRef();
      let stamp: PlayerStamp = { playerID: playerID, teamID: reg.teamID };
      let info: any = reg;
      info['playerID'] = playerID;
      ref.set(stamp).then(() => {
        this.fb.database().ref(`/info/${playerID}`).set(info, () => {
          resolve(stamp);
        });
      });
    });
  }

  private newTeamRef(): { ref: any, teamID: string } {
    let ref: any = this.fb.database().ref('/teams').push();
    let parts: string[] = (<string> ref.toString()).split('/');
    let teamID: string = parts[parts.length-1];
    return { ref: ref, teamID: teamID };
  }

  private newPlayerRef(): { ref: any, playerID: string } {
    let ref: any = this.fb.database().ref('/players').push();
    let parts: string[] = (<string> ref.toString()).split('/');
    let playerID: string = parts[parts.length-1];
    return { ref: ref, playerID: playerID };
  }

}

