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
var capital_case_1 = require('../../pipes/capital-case');
/*
  Generated class for the PlayerCreationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PlayerCreationPage = (function () {
    function PlayerCreationPage(navCtrl, db, params) {
        this.navCtrl = navCtrl;
        this.db = db;
        console.log('player-creation', 'constructor', '>>>', params.data);
        this.teamID = params.get('teamID');
        this.isAdmin = params.get('isAdmin');
        this.teamName = this.db.onTeam(this.teamID).map(function (team) { return team.name; });
    }
    PlayerCreationPage.prototype.onSubmit = function (form) {
        console.log('player-creation', 'onSubmit', '>>>', form);
        if (form.password == form.confirm) {
            var reg = {
                confirm: form.confirm,
                dob: form.dob,
                email: form.email,
                firstName: form.firstName,
                lastName: form.lastName,
                password: form.password,
                phone: form.phone,
                teamID: this.teamID
            };
            this.db.createNewPlayer(reg).then(function (player) {
                console.log('player-creation', 'onSubmit', '>>>', player);
                if (player) {
                }
                else {
                }
            });
        }
        else {
        }
    };
    PlayerCreationPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/player-creation/player-creation.html',
            pipes: [capital_case_1.CapitalCasePipe]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, my_data_1.MyData, ionic_angular_1.NavParams])
    ], PlayerCreationPage);
    return PlayerCreationPage;
}());
exports.PlayerCreationPage = PlayerCreationPage;
