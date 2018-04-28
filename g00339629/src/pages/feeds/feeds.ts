import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FeedsProvider } from '../../providers/feeds/feeds'

// import { FeedPopoverPage } from '../feed-popover/feed-popover';
// import { FeedPopoverPageModule } from '../feed-popover/feed-popover.module';


@IonicPage()
@Component({
    selector: 'page-feeds',
    templateUrl: 'feeds.html',
})
export class FeedsPage {
    // @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
    // @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;

    // RSS status
    status:boolean = false
    feed = {}
    items:any[] = []

    /**
    *    url for testing
    */
    url =[
        'http://epidemz.co/filmy/rss.xml'
        , 'http://epidemz.co/serial/rss.xml'
        , 'http://epidemz.co/muzyka/rss.xml'
        , 'http://feeds.bbci.co.uk/news/world/europe/rss.xml'
        , 'http://feeds.reuters.com/reuters/technologyNews'
    ]

    /**
    *   If true: card view is displayed
    */
    view:string

    constructor(
            public navCtrl: NavController
            , public navParams: NavParams
            , private fp:FeedsProvider
            , public popoverCtrl: PopoverController
            , private storage: Storage
    ){
        this.storage.get('viewType')
                .then(it => this.view = it)
                .catch(err=> console.error(err))
                .then(it => console.log('in Feeds: '+ this.view))
    }

    /**
    *     function fires then page is loaded
    */
    ionViewDidLoad() {
      console.log('ionViewDidLoad FeedsPage');
      this.loadFeeds()
    }

    /**
    *   load feeds
    */
    loadFeeds = () =>
            this.fp.getFeed(this.url[0])
                        .subscribe(data=> {
                            console.log(encodeURIComponent(this.url[0]))

                            if( data.status === 'ok'){
                                this.status = true
                                this.feed = data.feed
                                this.items = data.items
                            }
                        })


    /**
    *   refresh content
    */
    doRefresh = (refresher:any) =>{
        console.log('Begin async operation', refresher);
        // refresher.complete();

        setTimeout(() => {
              console.log('Async operation has ended');
              refresher.complete();
        }, 500);
    }

    /**
    *   Deletes feed from array
    */
    removeFeed = (item:any) => this.items = this.items.filter(it=> it !== item)


    /**
    *   More menu popover
    */
    moreMenu = (event: UIEvent) => {
        let popover = this.popoverCtrl.create('FeedPopoverPage')
        console.log('popover event', event)
        popover.present({ev: event})
    }

    /**
    *   Search for feed
    */
    search = () => console.log('todo')

    /**
    *
    */
    itemClicked = (item) => console.log(`item ${item} clicked`)

}
