import { Component } from '@angular/core';

@Component({
  selector: 'feed-menu-more',
  templateUrl: 'feed-menu-more.html'
})
export class FeedMenuMoreComponent {

    text: string;

    constructor() {
        console.log('Hello FeedMenuMoreComponent Component');
        this.text = 'Hello World';
    }

    changeview = () => {}

}
