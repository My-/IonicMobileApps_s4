import { Component } from '@angular/core';
import { ViewActionProvider } from '../../providers/view-action/view-action';
import { FeedsProvider } from '../../providers/feeds/feeds';

@Component({
    selector: 'thumbnail-view'
    , templateUrl: 'thumbnail-view.html'
    , inputs: ['items']
})
export class ThumbnailViewComponent {

    text: string;

    constructor(
        private view:ViewActionProvider
        , private feeds: FeedsProvider
    ) {
        console.log('Hello ThumbnailViewComponent Component');
        this.text = 'Hello World';
    }

}
