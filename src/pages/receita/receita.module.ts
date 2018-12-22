import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceitaPage } from './receita';

@NgModule({
  declarations: [
    ReceitaPage
  ],
  imports: [
    IonicPageModule.forChild(ReceitaPage),
  ],
  exports: [
    ReceitaPage
  ]
})
export class ReceitaPageModule {}