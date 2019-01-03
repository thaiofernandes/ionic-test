import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public bluetoothDevices = [];

  constructor(public navCtrl: NavController, 
              private bluetoothSerial: BluetoothSerial, 
              public loadingCtrl: LoadingController, 
              private alertCtrl: AlertController) {
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
                                    //console.log('Cancel clicked');
                                  }
                                },
                                {
                                  text: 'Connect',
                                  handler: () => {
                                    this.bluetoothSerial.connect(device.address).subscribe(success => {
                                                                                                //this.navCtrl.push(this.carritoPage);
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

}
