import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPopoverPage } from './feed-popover';
import { MenuViewsModule } from '../../components/menu-views/menu-views.module'
import { FeederSetingsModule } from '../../components/feeder-setings/feeder-setings.module'

@NgModule({
  declarations: [
    FeedPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPopoverPage)
    , MenuViewsModule
    , FeederSetingsModule
  ],
})
export class FeedPopoverPageModule {}
