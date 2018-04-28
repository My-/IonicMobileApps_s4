import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'feed-menu-more'
  , templateUrl: 'feed-menu-more.html'
  , inputs: ['viewType']
})
export class FeedMenuMoreComponent {

    text: string
    viewType:string

    constructor(
        private storage:Storage
    ) {
        console.log('Hello FeedMenuMoreComponent Component');
        this.text = 'Hello World';
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FeedMenuMoreComponent');
    }

    // ionViewWillEnter = () => {
    //     console.log('ionViewWillEnter() @ FeedMenuMoreComponent')
    //
    //     this.storage.get('viewType')
    //             .then(it => this.viewType = it)
    //             .catch(err => console.error(err))
    //             .then(it => console.log('got: '+ this.viewType))
    // }



    changeview = () => {
        let view:string

        this.storage.set('viewType', this.viewType)
                .then(() =>

                    this.storage.get('viewType')
                            .then(it => view = it)
                            .catch(err => console.error(err))
                            .then(it => console.log('view is: '+ view))

                )
        // console.log('changeview(): '+ view +', viewType: '+ this.viewType)
    }


}
