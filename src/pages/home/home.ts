import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ReceitaPage } from '../receita/receita';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public modalCtrl: ModalController) { }
  
  items = [
    'IPA',
    'Pale Ale',
    'Stout'
  ];

  presentModal(){
    const modal = this.modalCtrl.create(ReceitaPage);
    modal.present();
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }



}
