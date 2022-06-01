import { Component, OnInit } from '@angular/core';
import {ToastController } from '@ionic/angular';// Libreria mensaje Toas
import {NavigationExtras, Router, ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
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

  saveComentario = {
    VAR_COMENT_DESC : '',
    USUARIO_INT_ID_USU : 0,
    PUBLICACION_INT_ID_PUBLI : 0,
  } 

  //INT_ID_COMENT, VAR_COMENT_DESC, BOOL_ACTIVA, USUARIO_INT_ID_USU, PUBLICACION_INT_ID_PUBLI

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute, private toast: ToastController) { 
    this.activateRoute.queryParams.subscribe(Params =>{
      if(this.router.getCurrentNavigation().extras.state)
      {
        this.datos = this.router.getCurrentNavigation().extras.state;
      }

    })

 
  }

  ngOnInit() {

    const getUser = {
      var_user: this.datos.iduser
    }

    this.api.getPerfilusuario(getUser).subscribe(resUser =>
      {
      this.usuario = resUser.usuarios[0];
      //console.log("datos de usuario rescatado");
      //console.log(this.usuario);
      return this.usuario;
      });

    const getPost = {
      INT_ID_PUBLI: this.datos.idPost
    }

    this.api.consultarPublicacion(getPost).subscribe(resPost =>{
      this.post = resPost[0];
      return this.post;
    });


    const getComent = {
        PUBLICACION_INT_ID_PUBLI: this.datos.idPost
    }

    this.api.consultarComentarios(getComent).subscribe(resComent =>{
      this.comentarios = resComent;
      console.log("comentarios recuperados")
      console.log(this.comentarios)
    })


    
  } // fin NgOninit


  async publicarComentario(){
    console.log(this.saveComentario.VAR_COMENT_DESC);
    const dxUsuario = await Storage.get({ key: 'logueado' });
    this.idUsuario = JSON.parse(dxUsuario.value).INT_ID_USU;

    this.saveComentario.USUARIO_INT_ID_USU = this.idUsuario;
    this.saveComentario.PUBLICACION_INT_ID_PUBLI = this.datos.idPost;
    
    console.log("guardar comentario")
    console.log(this.saveComentario)


    this.api.guardarComentario(this.saveComentario).subscribe(msg=> {
      this.toastMsj(msg.mensaje)
    });

    this.saveComentario.VAR_COMENT_DESC = "";


    
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


