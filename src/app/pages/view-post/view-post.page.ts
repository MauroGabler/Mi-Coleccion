import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {

  usuario:any={}
  post:any={}
  comentarios:any=[]


  datos:any;
  tipoPublicacion: number;
  idUsuario: number;
  idPost: number;

  saveComentario = {
    VAR_COMENT_DESC : '',
    USUARIO_INT_ID_USU : 0,
    PUBLICACION_INT_ID_PUBLI : 0,
  } 
  

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: ToastController,
    private activateRoute: ActivatedRoute) {

    this.activateRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.datos = this.router.getCurrentNavigation().extras.state;

        const getPost = { INT_ID_PUBLI: this.datos.idPost };

        this.api.consultarPublicacion(getPost).subscribe(resPost => {
          this.post = resPost[0];

          return this.post;
        });
      }
    });
  }

  ngOnInit() {
    this.getPerfilUsuario();
    this.getPublicaciones();
    this.getComentarios();
  }

  async datosPagina() {
    const dxUsuario = await Storage.get({ key: 'logueado' });
    this.idUsuario = JSON.parse(dxUsuario.value).INT_ID_USU;
  }

  async getPublicaciones() {
    const getPost = { INT_ID_PUBLI: this.datos.idPost }

    this.api.consultarPublicacion(getPost).subscribe(resPost => {
      this.post = resPost[0];
      return this.post;
    });
  }

  async getPerfilUsuario() {
    const getUser = { var_user: this.datos.iduser };

    this.api.getPerfilusuario(getUser).subscribe(resUser => {
      this.usuario = resUser.usuarios[0];
      return this.usuario;
    });
  }


  async meGusta() {   
    const params = {
      int_id_publi: this.datos.idPost
    };
    this.api.guardarMeGusta(params).subscribe(res => {
      this.toastMsj('Te gusta!');
    });
  }

  getComentarios() {
    const getComent = { PUBLICACION_INT_ID_PUBLI: this.datos.idPost };

    this.api.consultarComentarios(getComent).subscribe(resComent => {
      this.comentarios = resComent;
    });
  }

  async publicarComentario() {
    const dxUsuario = await Storage.get({ key: 'logueado' });
    this.idUsuario = JSON.parse(dxUsuario.value).INT_ID_USU;

    this.saveComentario.USUARIO_INT_ID_USU = this.idUsuario;
    this.saveComentario.PUBLICACION_INT_ID_PUBLI = this.datos.idPost;

    this.api.guardarComentario(this.saveComentario).subscribe(msg => {
      this.toastMsj(msg.mensaje);
      this.getComentarios();
    });

    this.saveComentario.VAR_COMENT_DESC = '';
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


