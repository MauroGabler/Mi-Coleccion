import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {

  usuario: object;
  post: object;
  datos: any;
  idPublicacion: number;

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: ToastController,
    private activateRoute: ActivatedRoute) {

    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.datos = this.router.getCurrentNavigation().extras.state;
      }
    });
  }

  ngOnInit() {

    const getUser = {
      var_user: this.datos.iduser
    };

    this.api.getPerfilusuario(getUser).subscribe(resUser => {
      this.usuario = resUser.usuarios[0];
      return this.usuario;
    });

    const getPost = {
      INT_ID_PUBLI: this.datos.idPost
    };

    this.api.consultarPublicacion(getPost).subscribe(resPost => {
      this.post = resPost[0];
      return this.post;
    });
  } // fin NgOninit

  async meGusta() {
    
    const params = {
      int_id_publi: this.datos.idPost
    };
    this.api.guardarMeGusta(params).subscribe(res => {
      this.toastMsj('Te gusta!');
    });
  }

  async toastMsj(mensaje) {
    const toast = await this.toast.create({
      message: mensaje,
      position: 'bottom',
      duration: 3000,
    });
    toast.present();
  }

}


