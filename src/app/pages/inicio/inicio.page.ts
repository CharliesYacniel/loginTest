import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private  authService: AuthService, private  router: Router, private toastController: ToastController) { }


  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Advertencia',
      duration: 2000,
      message: 'Tu sesion ha expirado,favor Ingresa tus credenciales nuevamente',
      position: 'middle',
      color: 'danger',
      buttons: [
           {
            side: 'bottom',
            icon: 'star',
            text: 'Aceptar',
            handler: () => {
              console.log('clicked the toast xD');
            }
          }]
    });
    toast.present();
  }
  ngOnInit() {
  }

  logout(form) {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  abrirMenu() {
    // this.menu.openFirst();
    console.log('abrir menu');
    
  }

}
