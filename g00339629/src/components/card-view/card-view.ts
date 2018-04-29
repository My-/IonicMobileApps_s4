import { Component } from '@angular/core';
import { ViewActionProvider } from '../../providers/view-action/view-action';



@Component({
    selector: 'card-view'
    , templateUrl: 'card-view.html'
    , inputs: ['items']
})
export class CardViewComponent {
    items:any[]

    // text: string;

    constructor(
        private view:ViewActionProvider
    ){
        console.log('Hello CardViewComponent Component');
        // this.text = 'CardViewComponent';
    }

}
