import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GooglemapPage } from './googlemap';

@NgModule({
  declarations: [
    GooglemapPage,
  ],
  imports: [
    IonicPageModule.forChild(GooglemapPage),
  ],
  entryComponents: [GooglemapPage]
})
export class GooglemapPageModule {}
