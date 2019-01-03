import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceitaPage } from './receita';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    ReceitaPage
  ],
  imports: [
    IonicPageModule.forChild(ReceitaPage),
    IonicStorageModule.forRoot()
  ],
  exports: [
    ReceitaPage
  ]
})
export class ReceitaPageModule {}