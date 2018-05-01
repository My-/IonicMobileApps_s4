import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class UserFeedsProvider {

    /**
    *   Saved feeds
    */
    userFeeds:any[] = []
    protected userFeedsKey = 'userFeeds'

    constructor(
        public http: HttpClient
        , public storage: Storage
    ) {
        console.log('Hello UserFeedsProvider Provider');
        this.loadSavedFeeds()
    }

    /**
    *   Get user saved feeds as array
    */
    get = ():any[] => this.userFeeds

    /**
    *   Deletes feed from array
    */
    removeFeed = (item:any) => {
        this.userFeeds = this.userFeeds.filter(it=> it !== item)

    }

    /**
    *   Save users feed array to storage
    */
    saveUserFeed = (feed?:any) => {
        if( feed ){
            console.log('got: '+ feed)
            if( !this.userFeeds ){ this.userFeeds = [] }            
            this.userFeeds.push(feed)
        }

        this.storage.set(this.userFeedsKey, this.userFeeds)
                .then(it => console.log('saved feed: '+ it))
                .catch(err => console.error('Error then saving'+ err))
    }

    /**
    *   Loads previosly saved feeds from storage
    */
    loadSavedFeeds(){
        this.storage.get(this.userFeedsKey)
                .then(it => this.userFeeds = it)       // load from storage
                .catch(err=> console.error('Error then loading: '+ err))
                .then(() => console.log(`loaded ${this.userFeeds ? this.userFeeds.length : 0} saved items`))
    }

}
