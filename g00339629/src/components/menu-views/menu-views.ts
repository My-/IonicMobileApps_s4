import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'menu-views'
    , templateUrl: 'menu-views.html'
})

/**
*   Component responsible for view settings (used inside feeds popover page)
*/
export class MenuViewsComponent {

    // @reference: https://www.youtube.com/watch?v=DUe8y6QVPMk

    /**
    *   Input data
    */
    @Input('rssView') public viewType:string

    /**
    *   Output data
    */
    @Output() public dataEvent:EventEmitter<string> = new EventEmitter()

    constructor(){ console.log('Hello MenuViewsComponent Component') }

    /**
    *   Emit data to parent
    */
    changeView = () => { this.dataEvent.emit(this.viewType) }

}
