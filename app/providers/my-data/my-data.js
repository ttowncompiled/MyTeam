"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var rxjs_1 = require('rxjs');
require('rxjs/add/operator/map');
var Database = (function () {
    function Database() {
    }
    Database.prototype.isUserAuthed = function () { return null; };
    Database.prototype.checkIfTeamExists = function (name) { return null; };
    Database.prototype.onTeam = function (teamID) { return null; };
    Database.prototype.auth = function (teamID, email, password) { return null; };
    Database.prototype.unauth = function () { return null; };
    Database.prototype.createNewTeam = function (name) { return null; };
    Database.prototype.checkIfPlayerExists = function (teamID, email) { return null; };
    Database.prototype.createNewPlayer = function (reg) { return null; };
    return Database;
}());
exports.Database = Database;
/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var MyData = (function (_super) {
    __extends(MyData, _super);
    function MyData(fb) {
        _super.call(this);
        this.fb = fb;
    }
    MyData.prototype.newTeamRef = function () {
        var ref = this.fb.database().ref(MyData.TEAMS).push();
        var parts = ref.toString().split('/');
        var teamID = parts[parts.length - 1];
        return { ref: ref, teamID: teamID };
    };
    MyData.prototype.isUserAuthed = function () {
        var _this = this;
        _super.prototype.isUserAuthed.call(this);
        return rxjs_1.Observable.merge(rxjs_1.Observable.of(this.fb.auth().currentUser), new rxjs_1.Observable(function (subscriber) {
            _this.fb.auth().onAuthStateChanged(function (user) {
                subscriber.next(user);
            });
        }))
            .map(function (user) { return user ? { playerID: user.uid } : null; });
    };
    MyData.prototype.checkIfTeamExists = function (name) {
        return this.fb.database()
            .ref(MyData.TEAMS)
            .once(MyData.VAL)
            .then(function (snap) { return snap ? snap.val() : null; })
            .then(function (snap) {
            if (!snap)
                return [];
            return Object.keys(snap)
                .map(function (teamID) { return snap[teamID]; })
                .filter(function (team) { return team.name == name; });
        })
            .then(function (teams) { return teams.length == 1 ? teams[0] : null; });
    };
    MyData.prototype.onTeam = function (teamID) {
        var _this = this;
        return new rxjs_1.Observable(function (subscriber) {
            _this.fb.database()
                .ref(MyData.TEAMS + "/" + teamID)
                .on(MyData.VAL, function (snap) { return subscriber.next(snap ? snap.val() : null); });
        });
    };
    MyData.prototype.auth = function (teamID, email, password) {
        return this.fb.auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (user) { return user ? { playerID: user.uid } : null; });
    };
    MyData.prototype.unauth = function () {
        return this.fb.auth().signOut().then(function () { return true; });
    };
    MyData.prototype.createNewTeam = function (name) {
        var _this = this;
        return this.checkIfTeamExists(name)
            .then(function (team) {
            if (team)
                throw team;
            return _this.newTeamRef();
        })
            .then(function (teamRef) {
            var team = { teamID: teamRef.teamID, name: name };
            return teamRef.ref.set(team).then(function () { return team; });
        });
    };
    MyData.prototype.checkIfPlayerExists = function (teamID, email) {
        return this.fb.database()
            .ref(MyData.PLAYERS).once(MyData.VAL)
            .then(function (snap) { return snap ? snap.val() : null; })
            .then(function (snap) {
            if (!snap)
                return [];
            return Object.keys(snap)
                .map(function (playerID) { return snap[playerID]; })
                .filter(function (player) { return player.teamID == teamID && player.email == email; });
        })
            .then(function (players) { return players.length == 1; });
    };
    MyData.prototype.createNewPlayer = function (reg) {
        var _this = this;
        return this.checkIfPlayerExists(reg.teamID, reg.email)
            .then(function (exists) {
            if (exists)
                throw reg;
            return _this.fb.auth().createUserWithEmailAndPassword(reg.email, reg.password);
        })
            .then(function (user) {
            if (!user)
                throw reg;
            return { playerID: user.uid, email: reg.email, teamID: reg.teamID };
        })
            .then(function (player) {
            return _this.fb.database()
                .ref(MyData.PLAYERS + "/" + player.playerID)
                .set(player)
                .then(function () { return player; });
        })
            .then(function (player) {
            return _this.fb.database()
                .ref(MyData.ROSTER + "/" + player.teamID + "/" + player.playerID)
                .set(player.playerID)
                .then(function () { return player; });
        })
            .then(function (player) {
            var profile = {
                firstName: reg.firstName,
                lastName: reg.lastName,
                dob: reg.dob,
                phone: reg.phone,
                email: reg.email
            };
            return _this.fb.database()
                .ref(MyData.PROFILE + "/" + player.playerID)
                .set(profile)
                .then(function () { return player; });
        });
    };
    MyData.VAL = 'value';
    MyData.PLAYERS = '/players';
    MyData.PROFILE = '/profile';
    MyData.ROSTER = '/roster';
    MyData.TEAMS = '/teams';
    MyData = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(angularfire2_1.FirebaseApp)), 
        __metadata('design:paramtypes', [Object])
    ], MyData);
    return MyData;
}(Database));
exports.MyData = MyData;
