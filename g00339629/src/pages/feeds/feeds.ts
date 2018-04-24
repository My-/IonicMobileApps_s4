import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedsProvider } from '../../providers/feeds/feeds'

@IonicPage()
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {
    status:boolean = false
    feed = {}
    items:any[] = []

    url = 'http://epidemz.co/serial/rss.xml'
    // url = 'http://epidemz.co/filmy/rss.xml'
    // url = 'http://feeds.reuters.com/reuters/technologyNews'


  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , private fp:FeedsProvider) {
  }

  /**
  *     function fires then page is loaded
  */
  ionViewDidLoad() {
      console.log('ionViewDidLoad FeedsPage');

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

}
