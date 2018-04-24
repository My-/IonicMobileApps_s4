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


  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , private fp:FeedsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');

    this.fp.getFeed('http://feeds.reuters.com/reuters/technologyNews')
            .subscribe(data=> {
                if( data.status === 'ok'){
                    this.status = true
                    this.feed = data.feed
                    this.items = data.items
                }
            })
  }



}
