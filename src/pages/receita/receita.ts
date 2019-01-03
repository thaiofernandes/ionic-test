import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

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
  receitaForm : FormGroup;
  rampasBrassagem: FormArray;
  rampasFervura: FormArray;
  private key;
  private receita;

  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController, 
              private formBuilder: FormBuilder, 
              private storage: Storage, 
              private datepipe: DatePipe,
              public params: NavParams) {
    this.key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    this.receita = this.params.get("receita");
    if(this.receita != null){
      this.receitaForm = this.formBuilder.group({
        descricaoReceita: [this.receita.descricaoReceita, Validators.required],
        rampasBrassagem: this.formBuilder.array([ this.criarRampaBrassagem() ]),
        rampasFervura: this.formBuilder.array([ this.criarRampaFervura() ])
      });
    }else{
      this.receitaForm = this.formBuilder.group({
        descricaoReceita: ['', Validators.required],
        rampasBrassagem: this.formBuilder.array([ this.criarRampaBrassagem() ]),
        rampasFervura: this.formBuilder.array([ this.criarRampaFervura() ])
      });
    }  
     
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitaPage');
  }

  salvar(receitaForm){
    this.storage.set(this.key, receitaForm);
    this.viewCtrl.dismiss(receitaForm);
  }

  private criarRampaBrassagem(): FormGroup {
    return this.formBuilder.group({
      temperatura: ['', Validators.required],
      tempo: ['', Validators.required]
    })
  }

  private criarRampaFervura(): FormGroup {
    return this.formBuilder.group({
      temperatura: ['', Validators.required],
      tempo: ['', Validators.required]
    })
  }

  public adicionarRampaBrassagem(): void{
    this.rampasBrassagem = this.receitaForm.get("rampasBrassagem") as FormArray;
    this.rampasBrassagem.push(this.criarRampaBrassagem());
  }

  public adicionarRampaFervura(): void{
    this.rampasFervura = this.receitaForm.get("rampasFervura") as FormArray;
    this.rampasFervura.push(this.criarRampaFervura());
  }
}
