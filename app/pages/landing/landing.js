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
var team_sign_in_1 = require('../team-sign-in/team-sign-in');
var team_creation_1 = require('../team-creation/team-creation');
/*
  Generated class for the LandingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LandingPage = (function () {
    function LandingPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.teamSignInPage = team_sign_in_1.TeamSignInPage;
        this.teamCreationPage = team_creation_1.TeamCreationPage;
    }
    LandingPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/landing/landing.html',
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController])
    ], LandingPage);
    return LandingPage;
}());
exports.LandingPage = LandingPage;
