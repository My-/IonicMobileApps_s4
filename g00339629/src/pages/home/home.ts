import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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
        , public alertCtrl: AlertController
        , private toastCtrl: ToastController
        , private flashlight: Flashlight
    ) {
        this.flashState = false
    }

    ionViewDidLoad =()=> {
        console.log('ionViewDidLoad HomePage')
        this.showToast("Sorry for ugliness. I'm not Web Designer", 'top')
    }

    /**
    *   Opens counting game page (unfinished)
    */
    navigateToCountingGamePage =()=> this.notDoneYet()

    /**
    *   Shows not don yeat messages
    */
    notDoneYet =()=> this.alertCtrl.create({
        title: 'Sorry, not done yet!',
        subTitle: 'Due lack of time is not finished',
        buttons: [{
            text: 'Yes, I do understand',
            handler: ()=> this.showToast('Thank you for understanding', 'middle')
        },{
            text: 'No, I want it!',
            handler: ()=> {
                this.showToast('You are mean', 'top')
                this.showToast('You are very mean', 'middle')
                this.showToast('You are very, very, very mean :(', 'bottom')
            }
        }]
    }).present()

    /**
    *   shows toast mesage
    */
    showToast =(message:string, position:string):Promise<any>=> this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: position
    }).present()

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

    /**
    *   Show weather
    */
    navigateToWeatherPage = () => this.notDoneYet()

}
