import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ViewTypeProvider } from '../../providers/view-type/view-type';

@IonicPage()
@Component({
    selector: 'page-feed-popover',
    templateUrl: 'feed-popover.html',
})
export class FeedPopoverPage {

    /**
    *   View type variable. Default value is 'Thumbnails'
    */
    public viewType:string

    constructor(
        private view: ViewTypeProvider
    ) {
        this.viewType = this.view.viewType
    }

    /**
    *   Event fires then leaving the page
    */
    ionViewWillLeave = () => { this.view.saveView() }

    /**
    *   Set view type. Data comes from child
    */
    setViewType(data:string){
        this.view.viewType = data
        console.log('received data: '+ this.view.viewType)
    }
    
}
