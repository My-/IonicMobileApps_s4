import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedsPage } from './feeds';

import { FeedsProvider } from '../../providers/feeds/feeds';
import { CardViewModule } from '../../components/card-view/card-view.module'
import { ThumbnailViewModule } from '../../components/thumbnail-view/thumbnail-view.module'



@NgModule({
  declarations: [FeedsPage],
  imports: [
    IonicPageModule.forChild(FeedsPage)
    , CardViewModule
    , ThumbnailViewModule
  ],

  providers:[FeedsProvider]
})
export class FeedsPageModule {}
