import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Vibration } from '@ionic-native/vibration'
import { Flashlight } from '@ionic-native/flashlight';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
// https://stackoverflow.com/a/47484882/5322506
import { HttpClientModule } from '@angular/common/http';

import { FeedsProvider } from '../providers/feeds/feeds';
import { ViewActionProvider } from '../providers/view-action/view-action';
import { ViewTypeProvider } from '../providers/view-type/view-type';
import { UserFeedsProvider } from '../providers/user-feeds/user-feeds';

@NgModule({
  declarations: [
    MyApp
],
  imports: [
    BrowserModule
    , HttpClientModule
    , IonicModule.forRoot(MyApp)
    , IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    // Native
    , StatusBar
    , SplashScreen
    , InAppBrowser
    , Vibration
    , Flashlight

    , FeedsProvider
    , ViewActionProvider
    , ViewTypeProvider
    , UserFeedsProvider
  ]
})
export class AppModule {}
