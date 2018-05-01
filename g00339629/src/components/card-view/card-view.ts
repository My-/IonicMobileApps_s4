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
        private viewAct:ViewActionProvider
    ){
        console.log('Hello CardViewComponent Component');
        // this.text = 'CardViewComponent';
    }

    /**
    *   Function to handle user click on individual feed
    */
    itemClicked =(item:any)=> this.viewAct.itemClicked(item)

}
