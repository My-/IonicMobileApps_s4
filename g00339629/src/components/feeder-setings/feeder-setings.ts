import { Component } from '@angular/core';
import { FeedsProvider } from '../../providers/feeds/feeds';

@Component({
  selector: 'feeder-setings',
  templateUrl: 'feeder-setings.html'
})
export class FeederSetingsComponent {

  text: string;

  constructor(
      private feedProv: FeedsProvider
  ) {
    console.log('Hello FeederSetingsComponent Component');
    this.text = 'Hello World';
  }

}
