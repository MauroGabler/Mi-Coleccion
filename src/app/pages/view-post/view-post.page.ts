import { Component, OnInit } from '@angular/core';
import {ToastController } from '@ionic/angular';// Libreria mensaje Toas
import {NavigationExtras, Router, ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {

  usuario:any={}
  post:any={}
  datos:any;

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) { 
    this.activateRoute.queryParams.subscribe(Params =>{
      if(this.router.getCurrentNavigation().extras.state)
      {
        this.datos = this.router.getCurrentNavigation().extras.state;
      }
      //console.log(this.datos)

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
      //console.log("datos de post rescatado");
      //console.log(this.post);
      return this.post;
    });
    
  } // fin NgOninit


}


