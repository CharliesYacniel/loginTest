import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    // TIME_IN_MS = 5000;
    valor = '';
    miBandera = null;
    durationToastTime = 3000;
    constructor(
                private  authService: AuthService,
                private  router: Router,
                private navCrt: NavController,
                private activeRoute: ActivatedRoute,
                private toastController: ToastController,
                ) { }
     ngOnInit() {
      this.miBandera = this.activeRoute.snapshot.paramMap.get('flag');
      if (this.miBandera) {
        console.log('se envio verdadero,levantar toast',this.miBandera);
          this.presentToast();
          // this.router.navigateByUrl('login');
      }
    }

  login(form) {
    this.authService.login(form.value).subscribe((res) => {
      console.log(res);
      this.valor = res.access_token;
      // this.router.navigateByUrl('inicio');
      this.navCrt.navigateForward(['inicio', this.valor]);
    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Tu sesión ha expirado',
      duration: this.durationToastTime,
      message: 'favor Ingresa tus credenciales nuevamente',
      position: 'bottom',
      color: 'danger'
    });
    return await toast.present();
  }
}
