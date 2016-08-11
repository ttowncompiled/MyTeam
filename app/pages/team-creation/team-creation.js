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
/*
  Generated class for the TeamCreationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TeamCreationPage = (function () {
    function TeamCreationPage(navCtrl, db) {
        this.navCtrl = navCtrl;
        this.db = db;
    }
    TeamCreationPage.prototype.onSubmit = function (form) {
        var _this = this;
        this.db.createNewTeam(form.teamName).then(function (team) {
            console.log('team-creation', 'onSubmit', '>>>', team);
            if (team)
                _this.navCtrl.push(player_creation_1.PlayerCreationPage, { teamID: team.teamID, isAdmin: true });
            else {
            }
        });
    };
    TeamCreationPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/team-creation/team-creation.html',
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, my_data_1.MyData])
    ], TeamCreationPage);
    return TeamCreationPage;
}());
exports.TeamCreationPage = TeamCreationPage;
