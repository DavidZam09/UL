import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(public loadingController: LoadingController, public toastController: ToastController) { }


  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }
  async presentLoadingOnly() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
    });
    await loading.present();
  }
}

