import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { LoadingController } from 'ionic-angular';
import { AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public bluetoothDevices = [];

  constructor(public navCtrl: NavController, 
              private bluetoothSerial: BluetoothSerial, 
              public loadingCtrl: LoadingController, 
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
    var that = this;
    var loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.bluetoothSerial.discoverUnpaired()
                        .then(function(success){
                          that.bluetoothDevices = success;
                           loading.dismiss();
                        });
  }

  itemSelected(device){
    let alert = this.alertCtrl.create({
                      title: 'Connect to device',
                      message: 'Do you want to connect to ' + device.name + '?',
                      buttons: [
                                {
                                  text: 'Cancel',
                                  role: 'cancel',
                                  handler: () => {
                                    this.showToast("Cancel clicked");
                                  }
                                },
                                {
                                  text: 'Connect',
                                  handler: () => {
                                    this.bluetoothSerial.connect(device.address)
                                                        .subscribe(success => {
                                                            this.deviceConnected();
                                                            this.showToast("Connected");
                                                        }, 
                                                        error => {
                                                            // Log errors if any
                                                            console.log(error);
                                                        });
                                  }
                                }
                              ]
                    });
    alert.present();
  }

  private deviceConnected(){
    this.bluetoothSerial.subscribe('\n').subscribe(success =>{
      
      this.handleData(success);
      this.showToast("Connected no subscribe");
    }, error => {
      console.log(error);
    });
  }

  private handleData(data){
    this.showToast("Notificação no handle");
    this.showToast(data);
  }

  private showToast(msg){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  public listPairedDevices(){
    this.bluetoothSerial.list().then(success => {
      this.bluetoothDevices = success;
      this.showToast("Devices loaded!");
    }, error => {
      console.log(error);
    });
  }

}
