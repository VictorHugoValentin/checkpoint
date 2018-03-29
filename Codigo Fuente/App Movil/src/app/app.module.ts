import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MisvaloracionesPage } from '../pages/misvaloraciones/misvaloraciones';
import { ServiciosPage } from '../pages/servicios/servicios';
import { ValoracionesPage } from '../pages/valoraciones/valoraciones';
import { AcercaPage } from '../pages/acerca/acerca';

import { Camera } from '@ionic-native/camera';
import {OpcionalesPage} from '../pages/opcionales/opcionales';
import {ConfirmacionPage} from '../pages/confirmacion/confirmacion';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
 
import { DatabaseProvider } from '../providers/database/database';
 
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseMySqlProvider } from '../providers/database-my-sql/database-my-sql';
    

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MisvaloracionesPage,
    ValoracionesPage,
    ServiciosPage,
    OpcionalesPage,
    AcercaPage,
    ConfirmacionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	  MisvaloracionesPage,
    ServiciosPage,
    ValoracionesPage,
    OpcionalesPage,
    AcercaPage,
    ConfirmacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseMySqlProvider,
  ]
 
})
export class AppModule {}
