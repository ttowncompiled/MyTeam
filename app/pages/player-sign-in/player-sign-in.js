"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var my_data_1 = require('../../providers/my-data/my-data');
var player_creation_1 = require('../player-creation/player-creation');
var capital_case_1 = require('../../pipes/capital-case');
/*
  Generated class for the PlayerSignInPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PlayerSignInPage = (function () {
    function PlayerSignInPage(navCtrl, db, params) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.playerCreationPage = player_creation_1.PlayerCreationPage;
        console.log('player-sign-in-page', 'constructor', '>>>', params.data);
        this.teamID = params.get('teamID');
        this.teamName = this.db.onTeam(this.teamID).map(function (team) { return team.name; });
    }
    PlayerSignInPage.prototype.onSubmit = function (form) {
        this.db.auth(this.teamID, form.email, form.password)
            .then(function (a) {
            console.log('player-sign-in', 'onSubmit', '>>>', a);
            if (a) {
            }
            else {
            }
        });
    };
    PlayerSignInPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/player-sign-in/player-sign-in.html',
            pipes: [capital_case_1.CapitalCasePipe]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, my_data_1.MyData, ionic_angular_1.NavParams])
    ], PlayerSignInPage);
    return PlayerSignInPage;
}());
exports.PlayerSignInPage = PlayerSignInPage;
