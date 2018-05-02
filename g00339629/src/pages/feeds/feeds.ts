import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, PopoverController, AlertController } from 'ionic-angular';

import { File } from '@ionic-native/file';

import { FeedsProvider } from '../../providers/feeds/feeds'
import { ViewActionProvider } from '../../providers/view-action/view-action';
import { ViewTypeProvider } from '../../providers/view-type/view-type';
import { UserFeedsProvider } from '../../providers/user-feeds/user-feeds';


@IonicPage()
@Component({
    selector: 'page-feeds',
    templateUrl: 'feeds.html',
})
export class FeedsPage {
    // @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
    // @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;

    // // RSS status
    // status:boolean = false
    // feed = {}
    // items:any[] = []

    // /**
    // *    url for testing
    // */
    // url =[
    //     'http://epidemz.co/filmy/rss.xml'
    //     , 'http://epidemz.co/serial/rss.xml'
    //     , 'http://epidemz.co/muzyka/rss.xml'
    //     , 'http://feeds.bbci.co.uk/news/world/europe/rss.xml'
    //     , 'http://feeds.reuters.com/reuters/technologyNews'
    // ]
    //
    // rssURL = this.url[0]
    showSearchBar:boolean = false

    /**
    *   If true: card view is displayed
    */
    // view:string

    constructor(
            private feedProv:FeedsProvider
            , private view: ViewTypeProvider
            , private viewAct: ViewActionProvider
            , public popoverCtrl: PopoverController
            , private file: File
            , private userFeeds: UserFeedsProvider
            , public alertCtrl: AlertController
    ){
        console.log('hello FeedsPage');

        // this.storage.get('viewType')
        //         .then(it => this.view.viewType = it)
        //         .catch(err => this.view.viewType = 'Thumbnails')
        //         .then(it => console.log('in Feeds: '+ this.view.viewType))

        // this.file.checkDir(this.file.dataDirectory, 'mydir')
        //         .then(_ => console.log('Directory exists'))
        //         .catch(err => console.log("Directory doesn't exist: "+ err))
        // //
        //
        // this.file.createDir(this.file.cacheDirectory, 'MyDir', true)
        //         .then( it => console.log('created: '+ it))
        //         .catch(err => console.log("Directory cant be created: "+ err))
        //
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
        this.feedProv.loadFeeds()
    }

    /**
    *   refresh content
    */
    doRefresh = (refresher:any) =>{
        console.log('Begin async operation', refresher);

        this.feedProv.loadFeeds()

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
    moreMenu = (event: UIEvent) => {
        let popover = this.popoverCtrl.create('FeedPopoverPage')
        // console.log('popover event', event)

        popover.present({ev: event})
    }

    /**
    *   Search for feed
    */
    search = () => {
        this.showSearchBar = !this.showSearchBar
        console.log('showSearchBar: '+ this.showSearchBar)
    }

    /**
    *   Fires then feed title clicked.
    */
    feedTitleClicked =(ev:any)=> {
        this.showEnterFeederAlert()
    }

    // changeURL =(url:string)=>{
    //     this.feedProv.setRssUrl(url)
    //     this.feedProv.loadFeeds(this.feedProv.rssURL)
    // }

    /**
    *
    */
    showEnterFeederAlert =()=> {
        let alert = this.alertCtrl.create({
            title: 'Change RSS feed source',
            subTitle: 'Enter new RSS feed source',
            inputs: [
                {
                    name: 'rssURL',
                    placeholder: 'Link'
                }
            ],
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


    // moveToPage() {
    //     this.navCtrl.push("MyPage", {
    //         "data": items
    //     })
    // }


}
