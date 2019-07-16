import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  argumentos = null;
  countEnd = null;
  conteo = null;
  constructor(private  authService: AuthService, 
              private  router: Router, 
              private toastController: ToastController,
              private activeRoute: ActivatedRoute,
              private navCrt: NavController
              ) {
                const timeOut = 60000;
                // const timeOut = 5000;
                const durationToastTime = 3000;

                async function presentToast() {
      const toast = await toastController.create({
        header: 'Quieres continuar Logeado?',
        duration: durationToastTime,
        message: 'Tu sesión ha expirado,favor Ingresa tus credenciales nuevamente',
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

    this.countEnd = timeOut / 1000;
                let intervaloParar = setInterval(() => {
this.countEnd = this.countEnd - 1;
console.log(this.countEnd);
}, 1000);

    // var id = setInterval(() => {  presentToast(); }, timeOut);
               
                let id = setTimeout(() => {
      this.authService.logout();
      this.navCrt.navigateForward(['login', true]);
      clearInterval(intervaloParar);
      // this.router.navigateByUrl('login');
    }, timeOut);

  }

  ngOnInit() {
    this.argumentos = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.argumentos);
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
