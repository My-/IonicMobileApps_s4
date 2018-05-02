import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Flashlight } from '@ionic-native/flashlight';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

    private flashState:boolean

    constructor(
        public navCtrl: NavController
        , public navParams: NavParams
        , private flashlight: Flashlight
    ) {
        this.flashState = false
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

    navigateToCountingGamePage = () => console.log('todo counting game')

    /**
    *   Go to feed page
    */
    navigateToFeedsPage =()=> this.navCtrl.push('FeedsPage')

    /**
    *   turns on/off flash light
    */
    toggleLight =()=> {
        this.flashState ? this.flashlight.switchOn() : this.flashlight.switchOff();
        this.flashState = !this.flashState
    }

    navigateToWeatherPage = () => console.log('todo weather')

    }
