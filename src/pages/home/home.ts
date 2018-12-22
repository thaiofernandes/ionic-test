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

  addReceita(){
    const modal = this.modalCtrl.create(ReceitaPage);
    modal.present();

    modal.onDidDismiss(data => {
      this.items.push(data);
    })
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }



}
