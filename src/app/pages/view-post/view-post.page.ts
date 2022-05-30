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
  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) { 

  }

  usuario:any=[];
  post:any=[];
 
  ngOnInit() {

    this.activateRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state)
        {
          let datos = this.router.getCurrentNavigation().extras.state;

          const getUser = {
            var_user: datos.iduser
          }

          const getPost = {
            INT_ID_PUBLI: datos.idPost
          }


          this.api.getPerfilusuario(getUser).subscribe(resUser =>
            {
            this.usuario = resUser.usuarios;
            console.log("datos de usuario rescatado");
            console.log(this.usuario);
            });

          this.api.consultarPublicacion(getPost).subscribe(resPost =>{
             this.post = resPost;
             console.log("datos de post rescatado");
             console.log(this.post);
             
           });
        } //Fin if
      }); //Fin ActivateRoute
  } // fin NgOninit






}


