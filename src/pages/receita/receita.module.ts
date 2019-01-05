import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceitaPage } from './receita';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@NgModule({
  declarations: [
    ReceitaPage
  ],
  imports: [
    IonicPageModule.forChild(ReceitaPage),
    IonicStorageModule.forRoot()
  ],
  providers: [
    DatePipe,
    BluetoothSerial
  ],
  exports: [
    ReceitaPage
  ]
})
export class ReceitaPageModule {}