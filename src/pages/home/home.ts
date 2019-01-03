import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ReceitaPage } from '../receita/receita';
import { Storage } from '@ionic/storage';
import { ReceitaEntity } from '../../model/receita-entity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  constructor(public modalCtrl: ModalController, private storage: Storage)  { 
    this.carregarReceitas();
  }
  
  receitas = new Array();

  addReceita(){
    const modal = this.modalCtrl.create(ReceitaPage);
    modal.present();

    modal.onDidDismiss(data => {
      this.receitas.push(data);
    })
  }

  itemSelected(item) {
    console.log("Selected Item", item);

    const modal = this.modalCtrl.create(ReceitaPage, item);
    modal.present();
  }

  private carregarReceitas(){
    return this.storage.forEach((value: ReceitaEntity, key: string, iterationNumber: Number) => {  
      this.receitas.push(value);
    })
      .then(() => {
        return Promise.resolve(this.receitas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

}
