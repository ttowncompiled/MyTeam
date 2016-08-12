import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { NewsPage } from '../news/news';
import { RosterPage } from '../roster/roster';
import { SeasonPage } from '../season/season';

/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  profilePage: any = ProfilePage;
  newsPage: any = NewsPage;
  rosterPage: any = RosterPage;
  seasonPage: any = SeasonPage;

  constructor(private navCtrl: NavController) {}

}
