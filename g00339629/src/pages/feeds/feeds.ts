import { Component } from '@angular/core';
import { IonicPage, PopoverController, AlertController } from 'ionic-angular';

import { FeedsProvider } from '../../providers/feeds/feeds'
import { ViewTypeProvider } from '../../providers/view-type/view-type';
import { UserFeedsProvider } from '../../providers/user-feeds/user-feeds';


@IonicPage()
@Component({
    selector: 'page-feeds',
    templateUrl: 'feeds.html',
})

/**
*   It's feed main page
*/
export class FeedsPage {
    /**
    *   if true shows search bar
    */
    showSearchBar:boolean = false

    constructor(
            private feedProv:FeedsProvider
            , private view: ViewTypeProvider        //<-- is used inside feeds.html
            , public popoverCtrl: PopoverController
            , private userFeeds: UserFeedsProvider  //<-- is used inside feeds.html
            , public alertCtrl: AlertController
    ){
        console.log('hello FeedsPage');
    }

    /**
    *     function fires then page is loaded
    */
    ionViewDidLoad =()=> {
        console.log('ionViewDidLoad @ FeedsPage');
        this.feedProv.loadFeeds()
    }

    /**
    *   refresh content
    */
    doRefresh = (refresher:any) =>{
        console.log('Begin async operation', refresher);

        this.feedProv.loadFeeds()  // reload feeds

        setTimeout(() => {
              console.log('Async operation has ended');
              refresher.complete();
        }, 500);
    }

    /**
    *   Filter data
    */
    filterItems(ev: any) {
        let val = ev.target.value;

        if (val && val.trim() !== '') {
            this.feedProv.items = this.feedProv.items.filter((item) => {
                console.log(this.feedProv.cleanTitle(item.title))
                return this.feedProv.cleanTitle(item.title)
                        .toLowerCase()
                        .includes(val.toLowerCase())
            })
        }
    }

    /**
    *   More menu popover
    */
    moreMenu =(event: UIEvent)=> this.popoverCtrl.create('FeedPopoverPage').present({ev: event})

    /**
    *   togle search bar
    */
    togleSearch =()=> this.showSearchBar = !this.showSearchBar

    /**
    *   Fires then feed title clicked.
    */
    feedTitleClicked =(ev:any)=> this.showEnterFeederAlert()

    /**
    *   Then caled shows alert prompt to enter new rss url
    */
    showEnterFeederAlert =()=> {
        let alert = this.alertCtrl.create({
            title: 'Change RSS feed source',
            subTitle: 'Enter new RSS feed source',
            inputs: [ { name: 'rssURL', placeholder: 'Link' } ],
            buttons: [
                {
                    text: 'OK',
                    handler: it => {
                        console.log('Entered url: '+ it.rssURL)
                        this.feedProv.changeFeeder(it.rssURL)
                        this.feedProv.loadFeeds()
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('Caceled')
                }
            ]
        })

        alert.present()
    }

}
