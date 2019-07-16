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

  constructor(private  authService: AuthService, private  router: Router, private toastController: ToastController) { 
     var timeOut=60000;
     var durationToastTime=3000;
    async function presentToast() {
      const toast = await toastController.create({
        header: 'Quieres continuar Logeado?',
        duration: durationToastTime,
        // message: 'Tu sesión ha expirado,favor Ingresa tus credenciales nuevamente',
        position: 'middle',
        color: 'danger',
        buttons: [
          {
            side: 'start',
            text: 'SI',
            role: 'Cancelar',
            handler: () => {
              console.log('Me quedo logeado');
            }
          },
           {
            side: 'end',
            text: 'NO',
            handler: () => {
              console.log('Me voy a casa Vince...');
              clearInterval(id);
              authService.logout();
              router.navigateByUrl('login');
            }
          }
        ]
      });
      return await toast.present();
    }

    var id =setInterval(()=>{  presentToast(); }, timeOut);

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
