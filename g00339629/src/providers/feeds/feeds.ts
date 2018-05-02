import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';


@Injectable()
export class FeedsProvider {

    private apiURL:string = "https://api.rss2json.com/v1/api.json"
    private apiKey:string = "72nhr3wkeukkx6pv9kz8p8cgu8doh9qbhrepco0x"
    // setings
    private rss_url = 'rss_url='        // url to be converted to JSON (must be escaped)
    private count = 'count='            // Count of feed items to return, default is 10 .

    /**
    * RSS status. If ok feed is ready
    */
    status:boolean = false
    /**
    *   Feed suplier data
    */
    feed = {}
    /**
    *   RSS feeds
    */
    items:any[] = []

    /**
    *    url for testing
    */
    url = [
         'http://feeds.bbci.co.uk/news/world/europe/rss.xml'
        , 'http://feeds.reuters.com/reuters/technologyNews'
    ]
    /**
    *   RSS fees url
    */
    // rssURL:Promise<string>
    rssURL:string

    private feederUrlKey = 'lastFeedProvider'

    constructor(
        public http: HttpClient
        , public storage: Storage
        , private vibration: Vibration
    ){
        console.log('Hello FeedsProvider Provider');
        this.loadFeeder(this.url[0])
                .then(()=> this.loadFeeds())

    }

    /**
    *   Sets RSS url
    */
    setRssUrl =(newUrl:string)=> {
        this.rssURL =  newUrl
        console.log('New RSS url: '+ this.rssURL)
    }

    /**
    *   Get feeds from net
    *
    *   https://stackoverflow.com/a/332888/5322506
    */
    getFeed =(rssURL:string):Observable<any>=> this.http.get(`${this.apiURL}?${this.apiKey}&${this.rss_url}${encodeURIComponent(rssURL)}`
            +`&${this.count}25`)

    /**
    *   cleans title
    */
    cleanTitle =(title:string):string=> {
        let start = title.indexOf('/')
        const end = title.indexOf('(')

        if( start > end ){ start = -1 }

        title = title.substring(
                start < 0 ? 0 : start +1,
                end < 0 ? title.length : end )

        return title;
    }

    /**
    *   get IMBD rating from given string
    */
    getRating =(str:string):number=> {
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
    *   Deletes feed from array
    */
    removeFeed =(item:any)=> this.items = this.items.filter(it=> it !== item)

    /**
    *   load feeds from rss url
    */
    loadFeeds =()=> {
        this.getFeed(this.rssURL).subscribe(data=> {
            console.log('subscribe feeds from: '+ this.rssURL)
            if( data.status === 'ok'){
                this.status = true
                this.feed = data.feed
                this.items = data.items
            }
        }, null, ()=> this.vibration.vibrate(200))  // vibrate then load finished
    }

    /**
    *   Change web rss url and save it just to remember last used url
    */
    changeFeeder =(rssURL:string)=> {
        this.rssURL = rssURL
        this.saveFeeder()
    }

    /**
    *   Save feeders url.
    */
    saveFeeder =()=> {
        this.storage.set(this.feederUrlKey, this.rssURL)
                .then(it=> console.log('saved feed: ', it))
                .catch(it=> console.log('error: ', it))
    }

    /**
    *   Load feeders url
    */
    loadFeeder =(defUrl:string):Promise<any>=> {
        return this.storage.get(this.feederUrlKey)
                .then(it=> this.rssURL = it ? it : defUrl)
                .catch(it=> console.log('error: cant load saved url:', it))
                .then(()=> console.log('loaded rss url: ', this.rssURL))
    }
}
