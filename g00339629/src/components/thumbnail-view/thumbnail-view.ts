import { Component } from '@angular/core';
import { ViewActionProvider } from '../../providers/view-action/view-action';
import { FeedsProvider } from '../../providers/feeds/feeds';
import { UserFeedsProvider } from '../../providers/user-feeds/user-feeds';

@Component({
    selector: 'thumbnail-view'
    , templateUrl: 'thumbnail-view.html'
    , inputs: ['items']
})
export class ThumbnailViewComponent {

    constructor(
        private viewAct:ViewActionProvider
        , private feeds: FeedsProvider
        , private userFeed: UserFeedsProvider
    ) {
        console.log('Hello ThumbnailViewComponent Component');
    }

    /**
    *   Deletes feed from array
    */
    removeFeed = (item:any) => {
        this.feeds.removeFeed(item)
        this.userFeed.removeFeed(item)
    }

    /**
    *   Function to handle user click on individual feed
    */
    itemClicked =(item:any)=> this.viewAct.itemClicked(item)

}
