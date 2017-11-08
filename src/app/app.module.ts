import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CameraPage } from '../pages/camera/camera';
import { GraphPage } from '../pages/graph/graph';
import { GooglemapPage } from '../pages/googlemap/googlemap';
import { UsersPage } from '../pages/users/users';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
/*
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDjPjGHo8NO1ieMC-1GS7E4iQ0aQIgWYps",
  authDomain: "fir-app-f68d4.firebaseapp.com",
  databaseURL: "https://fir-app-f68d4.firebaseio.com",
  projectId: "fir-app-f68d4",
  storageBucket: "fir-app-f68d4.appspot.com",
  messagingSenderId: "734410317581"
}; */

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CameraPage,
    GraphPage,
    GooglemapPage,
    UsersPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
   // AngularFireDatabaseModule,
    //AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CameraPage,
    GraphPage,
    GooglemapPage,
    UsersPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Toast,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Storage,
    InAppBrowser,
   // FirebaseProvider
    
  ]
})
export class AppModule {}
