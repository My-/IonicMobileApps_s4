import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class ViewActionProvider {

    rssURL:string

    constructor(
        private iab: InAppBrowser
        , public alertCtrl: AlertController
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
    *   function fires then feed is clicked in any view (card/thumbnail)
    */
    itemClicked =(item:any)=> this.showGoToBrowserAlert(item)

    /**
    *   Opens in browser (native)
    */
    openInBrowser =(url:string)=> this.iab.create(url).close()

    /**
    *   Go to browser alert
    */
    showGoToBrowserAlert =(item:any)=> this.alertCtrl.create({
        title: 'Go to source!',
        message: 'Do you want open feeds link in browser? ',
        buttons: [
            {
                text: 'OK',
                handler: () => this.openInBrowser(item.link)
            }, {
                text: 'Cancel',
                role: 'cancel',
                handler: it => console.log('Caceled')
            }
        ]
    }).present()



}
