import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
// import { UserFeedsProvider } from '../user-feeds/user-feeds';

// https://stackoverflow.com/questions/44377230/using-javascript-in-ionic-2
// https://www.npmjs.com/package/rss-to-json
// import * as Feed from  'rss-to-json'


@Injectable()
export class FeedsProvider {

    private apiURL:string = "https://api.rss2json.com/v1/api.json"
    private apiKey:string = "72nhr3wkeukkx6pv9kz8p8cgu8doh9qbhrepco0x"
    // setings
    private rss_url = 'rss_url='            // url to be converted to JSON (must be escaped)
    private order_by = 'order_by='      // Possible values : pubDate, author or title.
    private order_dir = 'order_dir='     // order direction 'desc' or 'asc' (default 'desc')
    private count = 'count='             // Count of feed items to return, default is 10 .

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


    constructor(
        public http: HttpClient
        , public storage: Storage
        // , public userFeeds: UserFeedsProvider
    ){
        console.log('Hello FeedsProvider Provider');
    }

    // https://stackoverflow.com/a/332888/5322506
    getFeed = (rssURL:string):Observable<any> =>
            this.http.get(`${this.apiURL}?${this.apiKey}&${this.rss_url}${encodeURIComponent(rssURL)}`
            +`&${this.count}13`)

    /**
    *   cleans title
    */
    cleanTitle = (title:string):string => {
        let start = title.indexOf('/')
        const end = title.indexOf('(')

        if( start > end ){ start = -1 }

        title = title.substring(
                start < 0 ? 0 : start +1,
                end < 0 ? title.length : end )

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
    *   Deletes feed from array
    */
    removeFeed = (item:any) => this.items = this.items.filter(it=> it !== item)

    /**
    *   load feeds
    */
    loadFeeds = (rssURL:string) =>
            this.getFeed(rssURL).subscribe(data=> {
                    console.log('encoded url : '+ encodeURIComponent(rssURL))
                    if( data.status === 'ok'){
                        this.status = true
                        this.feed = data.feed
                        this.items = data.items
                    }
            })




}
