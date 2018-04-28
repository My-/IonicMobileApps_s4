import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'menu-views'
    , templateUrl: 'menu-views.html'
    , inputs: ['viewType']
})
export class MenuViewsComponent {

    viewType:string

    constructor(
        private storage:Storage
    ) {
        console.log('Hello MenuViewsComponent Component');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MenuViewsComponent');
    }

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
