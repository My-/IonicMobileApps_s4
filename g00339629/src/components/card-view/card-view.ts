import { Component } from '@angular/core';
import { HelperFunctionProvider } from '../../providers/helper-function/helper-function';



@Component({
    selector: 'card-view'
    , templateUrl: 'card-view.html'
    , inputs: ['items']
})
export class CardViewComponent {
    items:any[]

    // text: string;

    constructor(
        private helper:HelperFunctionProvider
    ){
        console.log('Hello CardViewComponent Component');
        // this.text = 'CardViewComponent';
    }


}
