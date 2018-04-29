import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

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

    constructor(
        public http: HttpClient
    ){
        console.log('Hello FeedsProvider Provider');
    }

    // https://stackoverflow.com/a/332888/5322506
    getFeed = (rssURL:string):Observable<any> =>
            this.http.get(`${this.apiURL}?${this.apiKey}&${this.rss_url}${encodeURIComponent(rssURL)}`
            +`&${this.count}13`)


}
