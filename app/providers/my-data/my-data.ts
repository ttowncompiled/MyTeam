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
  name: string;
  teamID: TeamID;
}

export interface Player {
  email: string;
  playerID: PlayerID;
  teamID: TeamID;
}

export interface Registration {
  confirm: string;
  dob: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  teamID: TeamID;
}

export interface Roster {
  players: PlayerID[];
}

export interface Profile {
  dob: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

@Injectable()
export abstract class Database {
  abstract isUserAuthed(): Promise<AuthState>;
  abstract checkIfTeamExists(name: string): Promise<Team>;
  abstract onTeam(teamID: TeamID): Observable<Team>;
  abstract auth(teamID: TeamID, email: string, password: string): Promise<AuthState>;
  abstract unauth(): Promise<boolean>;
  abstract createNewTeam(name: string): Promise<Team>;
  abstract checkIfPlayerExists(teamID: TeamID, email: string): Promise<boolean>;
  abstract createNewPlayer(reg: Registration): Promise<Player>;
}

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class MyData extends Database {

  private static VAL: string = 'value';
  private static PLAYERS: string = '/players';
  private static PROFILE: string = '/profile';
  private static ROSTER: string = '/roster';
  private static TEAMS: string = '/teams';

  constructor(@Inject(FirebaseApp) public fb: firebase.app.App) {
    super();
  }

  private newTeamRef(): { ref: firebase.database.ThenableReference, teamID: string } {
    let ref: firebase.database.ThenableReference = this.fb.database().ref(MyData.TEAMS).push();
    let parts: string[] = ref.toString().split('/');
    let teamID: TeamID = parts[parts.length-1];
    return { ref: ref, teamID: teamID };
  }

  isUserAuthed(): Promise<AuthState> {
    return Promise.resolve(this.fb.auth().currentUser)
      .then((user: firebase.User) => user ? { playerID: user.uid } : null)
  }

  checkIfTeamExists(name: string): Promise<Team> {
    type TeamsSnap = { [teamID: string]: Team };
    return this.fb.database()
      .ref(MyData.TEAMS)
      .once(MyData.VAL)
      .then((snap: firebase.database.DataSnapshot) => snap ? (<TeamsSnap> snap.val()) : null)
      .then((snap: TeamsSnap) => {
        if (!snap) return [];
        return Object.keys(snap)
          .map((teamID: TeamID) => snap[teamID])
          .filter((team: Team) => team.name == name);
      })
      .then((teams: Team[]) => teams.length == 1 ? teams[0] : null);
  }

  onTeam(teamID: TeamID): Observable<Team> {
    return new Observable<Team>((subscriber: Subscriber<Team>) => {
      this.fb.database()
        .ref(`${MyData.TEAMS}/${teamID}`)
        .on(MyData.VAL, (snap: firebase.database.DataSnapshot) => subscriber.next(snap ? (<Team> snap.val()) : null));
    });
  }

  auth(teamID: TeamID, email: string, password: string): Promise<AuthState> {
    return this.fb.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user: firebase.User) => user ? { playerID: user.uid } : null);
  }

  unauth(): Promise<boolean> {
    return this.fb.auth().signOut().then(() => true);
  }

  createNewTeam(name: string): Promise<Team> {
    type TeamRef = { ref: firebase.database.ThenableReference, teamID: string };
    return this.checkIfTeamExists(name)
      .then((team: Team) => {
        if (team) throw team;
        return this.newTeamRef();
      })
      .then((teamRef: TeamRef) => {
        let team: Team = { teamID: teamRef.teamID, name: name };
        return teamRef.ref.set(team).then(() => team);
      });
  }

  checkIfPlayerExists(teamID: string, email: string): Promise<boolean> {
    type PlayerSnap = { [playerID: string]: Player };
    return this.fb.database()
      .ref(MyData.PLAYERS).once(MyData.VAL)
      .then((snap: firebase.database.DataSnapshot) => snap ? (<PlayerSnap> snap.val()) : null)
      .then((snap: PlayerSnap) => {
        if (!snap) return [];
        return Object.keys(snap)
          .map((playerID: string) => snap[playerID])
          .filter((player: Player) => player.teamID == teamID && player.email == email);
      })
      .then((players: Player[]) => players.length == 1);
  }

  createNewPlayer(reg: Registration): Promise<Player> {
    return this.checkIfPlayerExists(reg.teamID, reg.email)
      .then((exists: boolean) => {
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
      });
  }

}

