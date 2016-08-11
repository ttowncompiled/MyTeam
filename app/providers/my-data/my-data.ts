import { Injectable, Inject } from '@angular/core';
import { FirebaseAuthState, FirebaseApp } from 'angularfire2';
import { Observable, Subscriber } from 'rxjs';
import 'rxjs/add/operator/map';

export type TeamID = string;
export type PlayerID = string;

export interface AuthState {
  playerID: PlayerID;
}

export interface Team {
  teamID: TeamID;
  name: string;
}

export interface Player {
  playerID: PlayerID;
  email: string;
  teamID: TeamID;
}

export interface Registration {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
  teamID: TeamID;
}

export interface Roster {
  players: PlayerID[];
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
  abstract createNewTeam(name: string): Observable<Team>;
  abstract checkIfPlayerExists(teamID: TeamID, email: string): Promise<boolean>;
  abstract createNewPlayer(reg: Registration): Observable<Player>;
}

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyData extends Database {

  static VAL: string = 'value';
  static PLAYERS: string = '/players';
  static PROFILE: string = '/profile';
  static ROSTER: string = '/roster';
  static TEAMS: string = '/teams';

  constructor(@Inject(FirebaseApp) public fb: firebase.app.App) {
    super();
  }

  private newTeamRef(): { ref: firebase.database.ThenableReference, teamID: string } {
    let ref: firebase.database.ThenableReference = this.fb.database().ref(MyData.TEAMS).push();
    let parts: string[] = ref.toString().split('/');
    let teamID: TeamID = parts[parts.length-1];
    return { ref: ref, teamID: teamID };
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
    type TeamsSnap = { [teamID: string]: Team };
    return Observable.fromPromise<firebase.database.DataSnapshot>(this.fb.database().ref(MyData.TEAMS).once(MyData.VAL))
      .map<TeamsSnap>((snap: firebase.database.DataSnapshot) => snap ? (<TeamsSnap> snap.val()) : null)
      .flatMap<Team>((snap: TeamsSnap) => {
        if (!snap) return null;
        return Observable.from<TeamID>(Object.keys(snap))
          .map<Team>((teamID: TeamID) => snap[teamID])
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

  auth(email: string, password: string): Promise<AuthState> {
    return this.fb.auth().signInWithEmailAndPassword(email, password).then((user: firebase.User) => {
      return user ? { playerID: user.uid } : null;
    });
  }

  unauth(): Promise<boolean> {
    return this.fb.auth().signOut().then(() => true);
  }

  createNewTeam(name: string): Observable<Team> {
    type TeamRef = { ref: firebase.database.ThenableReference, teamID: string };
    return Observable.fromPromise<Team>(this.checkIfTeamExists(name).toPromise())
      .map<TeamRef>((team: Team) => {
        if (!!team) throw team;
        return this.newTeamRef();
      })
      .flatMap<TeamRef>((teamRef: TeamRef) => {
        let team: Team = { teamID: teamRef.teamID, name: name };
        return Observable.fromPromise<void>(teamRef.ref.set(team))
          .map<TeamRef>(() => teamRef);
      })
      .flatMap<Team>((teamRef: TeamRef) => {
        return new Observable<Team>((subscriber: Subscriber<Team>) => {
          teamRef.ref.on(MyData.VAL, (snap: firebase.database.DataSnapshot) => {
            subscriber.next(snap ? (<Team> snap.val()) : null);
          });
        });
      });
  }

  checkIfPlayerExists(teamID: string, email: string): Promise<boolean> {
    type PlayerSnap = { [playerID: string]: Player };
    return this.fb.database().ref(MyData.PLAYERS).once(MyData.VAL).then((snap: firebase.database.DataSnapshot) => {
        return snap ? (<PlayerSnap> snap.val()) : null;
      })
      .then((snap: PlayerSnap) => {
        if (!snap) return [];
        return Object.keys(snap)
          .map((playerID: string) => snap[playerID])
          .filter((player: Player) => player.teamID == teamID && player.email == email);
      })
      .then((players: Player[]) => players.length != 0);
  }

  createNewPlayer(reg: Registration): Observable<Player> {
    return Observable.fromPromise<Player>(
        this.checkIfPlayerExists(reg.teamID, reg.email).then((exists: boolean) => {
          if (exists) throw reg;
          return this.fb.auth().createUserWithEmailAndPassword(reg.email, reg.password);
        })
        .then((user: firebase.User) => {
          if (!user) throw reg;
          return { playerID: user.uid, email: reg.email, teamID: reg.teamID };
        })
        .then((player: Player) => {
          return this.fb.database()
              .ref(`${MyData.PLAYERS}/${player.playerID}`)
              .set(player)
              .then(() => player);
        })
        .then((player: Player) => {
          return this.fb.database()
            .ref(`${MyData.ROSTER}/${player.teamID}/${player.playerID}`)
            .set(player.playerID)
            .then(() => player);
        })
        .then((player: Player) => {
          let profile: Profile = {
            firstName: reg.firstName,
            lastName: reg.lastName,
            dob: reg.dob,
            phone: reg.phone,
            email: reg.email
          };
          return this.fb.database()
            .ref(`${MyData.PROFILE}/${player.playerID}`)
            .set(profile)
            .then(() => player);
        })
    )
    .flatMap<Player>((player: Player) => {
      return new Observable<Player>((subscriber: Subscriber<Player>) => {
        this.fb.database()
          .ref(`${MyData.PLAYERS}/${player.playerID}`)
          .on(MyData.VAL, (snap: firebase.database.DataSnapshot) => {
            subscriber.next(snap ? (<Player> snap.val()) : null);
          });
      });
    });
  }

}

