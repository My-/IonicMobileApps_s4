import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// https://stackoverflow.com/questions/44377230/using-javascript-in-ionic-2
// https://www.npmjs.com/package/rss-to-json
// import{Feed}from'rss-to-json'


@Injectable()
export class FeedsProvider {

    constructor(public http: HttpClient
        // , private feed:Feed
    ){
        console.log('Hello FeedsProvider Provider');
    }

    // getFeed = (link:string):JSON =>
    //         this.feed.load(link, (err, rss)=>{
    //                 console.log(rss)
    //                 console.log(err)
    //                 return rss
    //         })

}
