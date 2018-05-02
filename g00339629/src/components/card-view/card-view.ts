import { Component } from '@angular/core';
import { ViewActionProvider } from '../../providers/view-action/view-action';



@Component({
    selector: 'card-view'
    , templateUrl: 'card-view.html'
    , inputs: ['items']
})

/**
*   Card view component shows given 'items' array in car view
*/
export class CardViewComponent {
    /**
    *   items - feed array
    */
    items:any[]

    constructor(
        private viewAct:ViewActionProvider
    ){
        console.log('Hello CardViewComponent Component');
    }

    /**
    *   Function to handle user click on individual feed
    */
    itemClicked =(item:any)=> this.viewAct.itemClicked(item)

}
