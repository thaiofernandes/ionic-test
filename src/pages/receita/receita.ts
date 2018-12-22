import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the ReceitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-receita',
  templateUrl: 'receita.html',
})
export class ReceitaPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitaPage');
  }

  salvar(tipoCerveja: string){
    console.log(tipoCerveja);
    this.viewCtrl.dismiss(tipoCerveja);
  }

}
