import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ViewTypeProvider {

    /**
    *   variable to store view type
    */
    public viewType:string

    protected keyValue:string = 'viewType'

    /**
    *   Providers witch has view type parameter
    */
    constructor(
        private storage: Storage
    ) {
        console.log('Hello ViewTypeProvider Provider');
        this.loadView()
    }

    /**
    *   Save view type
    */
    saveView = () => {
        this.storage.set(this.keyValue, this.viewType)
                .then(it => console.log('saved viewType: '+ it))
                .catch(err => console.error('Error then saving'+ err))
    }

    /**
    *   Load view type
    */
    loadView = () => this.storage.get(this.keyValue)
            .then(it => this.viewType = it? it : 'Thumbnails')       // load from storage
            .then(() => console.log('loaded viewType: '+ this.viewType))
            .catch(err=> console.error('Error then loading: '+ err))


}
