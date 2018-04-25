import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedsProvider } from '../../providers/feeds/feeds'

import { PopoverController } from 'ionic-angular';
import { FeedPopoverPage } from '../feed-popover/feed-popover';
// import { FeedPopoverPageModule } from '../feed-popover/feed-popover.module';


@IonicPage()
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {
    // @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
    // @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;

    status:boolean = false
    feed = {}
    items:any[] = []

    url = 'http://epidemz.co/muzyka/rss.xml'
    // url = 'http://epidemz.co/serial/rss.xml'
    // url = 'http://epidemz.co/filmy/rss.xml'
    // url = 'http://feeds.reuters.com/reuters/technologyNews'


    constructor(public navCtrl: NavController
            , public navParams: NavParams
            , private fp:FeedsProvider
            , public popoverCtrl: PopoverController
        ){
    }

    /**
    *     function fires then page is loaded
    */
    ionViewDidLoad() {
      console.log('ionViewDidLoad FeedsPage');
      // this.loadFeeds()
      this.fp.getFeed(this.url)
            .subscribe(data=> {
                console.log(encodeURIComponent(this.url))

                if( data.status === 'ok'){
                    this.status = true
                    this.feed = data.feed
                    this.items = data.items
                }
            })
    }

    /**
    *   load feeds
    */
    loadFeeds = () =>
            this.fp.getFeed(this.url)
                        .subscribe(data=> {
                            console.log(encodeURIComponent(this.url))

                            if( data.status === 'ok'){
                                this.status = true
                                this.feed = data.feed
                                this.items = data.items
                            }
                        })


    /**
    *     cleans title
    */
    cleanTitle = (title:string):string => {
          let start = title.indexOf('/')
          const end = title.indexOf('(')

          if( start > end ){ start = -1 }

          title = title.substring(
                  start < 0 ? 0 : start +1,
                  end < 0 ? title.length : end
          )

          return title;
    }

    /**
    *   get IMBD rating
    */
    getRating = (str:string):number => {
        let start = str.indexOf('IMDB')
        let end:number

        if( start > -1 ){
            start = str.indexOf(':', start)
            end = str.indexOf('/', start)
            let ratingStr = str.substring(start +1, end)
            ratingStr = ratingStr.replace(',', '.')
            let rating = parseFloat(ratingStr)

            return rating
        }
        return 0
    }

    /**
    *   refresh content
    */
    doRefresh = (ev: UIEvent) => console.log('todo')

    /**
    *   Deletes feed from array
    */
    removeFeed = (item:any) => this.items = this.items.filter(it=> it !== item)


    /**
    *   More menu popover
    */
    moreMenu = (ev: UIEvent) => {
        let popover = this.popoverCtrl.create(FeedPopoverPage, {
            // contentEle: this.content.nativeElement,
            // textEle: this.text.nativeElement
        })

        popover.present({ev: ev})
    }

    /**
    *   Search for feed
    */
    search = () => console.log('todo')

}
