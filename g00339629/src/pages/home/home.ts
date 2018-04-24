import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  navigateToCountingGamePage = () => console.log('todo counting game')
  navigateToFeedsPage = () => this.navCtrl.push('FeedsPage')
  toggleLight = () => console.log('todo tougle light')
  navigateToWeatherPage = () => console.log('todo weather')

}
