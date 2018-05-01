import { Injectable } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class ViewActionProvider {

    constructor(
        private iab: InAppBrowser
    ){
        console.log('Hello ViewActionProvider Provider');
    }


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
    *
    */
    itemClicked =(item)=> {
        console.log(`item ${item.title} clicked`)

        const url = item.link
        const browser = this.iab.create(url);

        // browser.executeScript(...);
        // browser.insertCSS(...);

        // browser.on('loadstop').subscribe(event => {
        //    browser.insertCSS({ code: "body{color: red;" });
        // });

        browser.close();
    }


}
