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
var player_sign_in_1 = require('../player-sign-in/player-sign-in');
var my_data_1 = require('../../providers/my-data/my-data');
/*
  Generated class for the TeamSignInPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TeamSignInPage = (function () {
    function TeamSignInPage(navCtrl, db) {
        this.navCtrl = navCtrl;
        this.db = db;
    }
    TeamSignInPage.prototype.onSubmit = function (form) {
        var _this = this;
        this.db.checkIfTeamExists(form.teamName.toLowerCase()).then(function (team) {
            console.log('team-sign-in-page', 'onSubmit', '>>>', team);
            if (team)
                _this.navCtrl.push(player_sign_in_1.PlayerSignInPage, { teamID: team.teamID });
            else {
            }
        });
    };
    TeamSignInPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/team-sign-in/team-sign-in.html',
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, my_data_1.Database])
    ], TeamSignInPage);
    return TeamSignInPage;
}());
exports.TeamSignInPage = TeamSignInPage;
