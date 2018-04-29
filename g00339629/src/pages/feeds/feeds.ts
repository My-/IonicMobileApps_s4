import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';

import { File } from '@ionic-native/file';

import { FeedsProvider } from '../../providers/feeds/feeds'
import { ViewActionProvider } from '../../providers/view-action/view-action';
import { ViewTypeProvider } from '../../providers/view-type/view-type';


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

    rss = this.url[0]

    /**
    *   If true: card view is displayed
    */
    // view:string

    constructor(
            private fp:FeedsProvider
            , private view: ViewTypeProvider
            , public popoverCtrl: PopoverController
            , private file: File
    ){
        // this.storage.get('viewType')
        //         .then(it => this.view.viewType = it)
        //         .catch(err => this.view.viewType = 'Thumbnails')
        //         .then(it => console.log('in Feeds: '+ this.view.viewType))

        // this.file.checkDir(this.file.dataDirectory, 'mydir')
        //         .then(_ => console.log('Directory exists'))
        //         .catch(err => console.log("Directory doesn't exist: "+ err))
        //

        // this.file.createDir(this.file.cacheDirectory, 'MyDir', true)
        //         .then( it => console.log('created: '+ it))
        //         .catch(err => console.log("Directory cant be created: "+ err))

        // this.file.listDir(this.file.applicationDirectory, 'src')
        //         .then( (files) => {
        //             console.log(files)
        //         })
        //         .catch( (err) => {
        //             console.log("Directory doesn't exist: "+ err)
        //         });
    }

    /**
    *     function fires then page is loaded
    */
    ionViewDidLoad() {
      console.log('ionViewDidLoad @ FeedsPage');
      this.loadFeeds()
    }

    /**
    *   load feeds
    */
    loadFeeds = () =>
            this.fp.getFeed(this.rss)
                        .subscribe(data=> {
                            console.log(encodeURIComponent(this.rss))

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

        this.loadFeeds()

        setTimeout(() => {
              console.log('Async operation has ended');
              refresher.complete();
        }, 500);
    }

    /**
    *   Deletes feed from array
    */
    removeFeed = (item:any) => this.items = this.items.filter(it=> it !== item)

    filterItems(ev: any) {
        let val = ev.target.value;
        let title:string

        if (val && val.trim() !== '') {
            this.items = this.items.filter((item) => {
                this.fp.cleanTitle(item.title)
                        .toLowerCase()
                        .includes(val.toLowerCase())
            })

        }
    }

    /**
    *   More menu popover
    */
    moreMenu = (event: UIEvent) => {
        let popover = this.popoverCtrl.create('FeedPopoverPage')
        // console.log('popover event', event)

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
