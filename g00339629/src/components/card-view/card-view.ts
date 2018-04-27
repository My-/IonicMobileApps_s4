import { Component } from '@angular/core';



@Component({
    selector: 'card-view'
    , templateUrl: 'card-view.html'
    , inputs: ['items']
})
export class CardViewComponent {
    items:any[]

    // text: string;

    constructor() {
        console.log('Hello CardViewComponent Component');
        // this.text = 'CardViewComponent';
    }

    /**
    *   get IMBD rating
    */
    getRating = (str:string):number => {
        let start = str.indexOf('IMDB')
        let end:number

        if( start > -1 ){
            start = str.indexOf(':', start)
            end = str.indexOf('/', start)
            let ratingStr = str.substring(start +1, end)
            ratingStr = ratingStr.replace(',', '.')
            let rating = parseFloat(ratingStr)

            return rating
        }
        return 0
    }

    /**
    *     cleans title
    */
    cleanTitle = (title:string):string => {
          let start = title.indexOf('/')
          const end = title.indexOf('(')

          if( start > end ){ start = -1 }

          title = title.substring(
                  start < 0 ? 0 : start +1,
                  end < 0 ? title.length : end
          )

          return title;
    }

}
