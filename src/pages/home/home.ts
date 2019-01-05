import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ReceitaPage } from '../receita/receita';
import { Storage } from '@ionic/storage';
import { ReceitaEntity } from '../../model/receita-entity';
import { AlertController, ToastController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  constructor(public modalCtrl: ModalController, 
              private storage: Storage,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private bluetoothSerial: BluetoothSerial)  { 
    this.carregarReceitas();
  }
  
  receitas = new Array();

  public addReceita(){
    const modal = this.modalCtrl.create(ReceitaPage);
    modal.present();

    modal.onDidDismiss(data => {
      this.receitas.push(data);
    })
  }

  public itemSelected(item) {
    const modal = this.modalCtrl.create(ReceitaPage, item);
    modal.present();
  }

  public carregarReceitas(){
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

  public sendData(item){
    let dataSend: string = JSON.stringify(item); 
    dataSend += "\n";
    this.showToast(dataSend);

    this.bluetoothSerial.write(dataSend).then(success => {
      this.showToast(success);
    }, error => {
      console.log(error);
    });
  }

  private showToast(msg: string){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

}
