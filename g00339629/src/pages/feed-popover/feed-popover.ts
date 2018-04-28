import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-feed-popover',
    templateUrl: 'feed-popover.html',
})
export class FeedPopoverPage {

    viewType:string

    constructor(
        public navCtrl: NavController
        , public navParams: NavParams
        , private storage:Storage
    ) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FeedPopoverPage');
    }

    ionViewWillEnter = () => {
        console.log('ionViewWillEnter() @ FeedPopoverPage')

        this.storage.get('viewType')
                .then(it => this.viewType = it)
                .catch(err => console.error(err))
                .then(it => console.log('got: '+ this.viewType))
    }

    // TODO: do change view here & pass as parameters to fed menu component

}
