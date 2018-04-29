import { Component,Input, Directive } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ViewTypeProvider } from '../../providers/view-type/view-type';

@IonicPage()
@Component({
    selector: 'page-feed-popover',
    templateUrl: 'feed-popover.html',
})
// @Directive({
//     selector: '[(rssView)]'
// })
export class FeedPopoverPage {

    /**
    *   View type variable. Default value is 'Thumbnails'
    */
    public viewType:string

    constructor(
        public navCtrl: NavController
        , public navParams: NavParams
        , private storage:Storage
        , public viewCtrl: ViewController
        , private view: ViewTypeProvider
    ) {
        this.viewType = this.view.viewType
    }

    // ionViewDidLoad() {
    //     console.log('ionViewDidLoad FeedPopoverPage');
    // }
    //
    // ionViewWillEnter = () => {
    //     console.log('ionViewWillEnter() @FeedPopoverPage')
    // }

    ionViewWillLeave(){
        console.log('ionViewWillLeave() @ FeedPopoverPage')
        this.close()
    }

    close(){
        console.log('close feed-popover')
        this.view.saveView()
    }

    setViewType(data:string){
        this.view.viewType = data
        console.log('received data: '+ this.view.viewType)
    }



}
