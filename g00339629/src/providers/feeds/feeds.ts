import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

// https://stackoverflow.com/questions/44377230/using-javascript-in-ionic-2
// https://www.npmjs.com/package/rss-to-json
import * as Feed from  'rss-to-json'


@Injectable()
export class FeedsProvider {

    private apiURL:string = "https://api.rss2json.com/v1/api.json"
    private apiKey:string = "72nhr3wkeukkx6pv9kz8p8cgu8doh9qbhrepco0x"
    // setings
    private rss = 'rss_url='            // url to be converted to JSON (must be escaped)
    private order_by = 'order_by='      // Possible values : pubDate, author or title.
    private order_dir = 'order_dir='     // order direction 'desc' or 'asc' (default 'desc')
    private count = 'count='             // Count of feed items to return, default is 10 .

    // https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.reuters.com%2Freuters%2FtechnologyNews

    constructor(public http: HttpClient
        // , private feed:Feed
    ){
        console.log('Hello FeedsProvider Provider');
    }

    // getFeed = (link:string):Observable<any> =>
    //         Feed.load(link, (err, rss)=>{
    //                 console.log(rss)
    //                 console.log(err)
    //                 return rss.map(it => it)
    //         })

    // https://stackoverflow.com/a/332888/5322506
    getFeed = (rssURL:string):Observable<any> =>
            this.http.get(`${this.apiURL}?${this.apiKey}&${this.rss}${encodeURIComponent(rssURL)}`
            +`&${this.count}13`)
                    .map(it => it)

}
