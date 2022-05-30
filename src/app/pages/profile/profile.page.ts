import { Component, OnInit } from '@angular/core';
import {ToastController } from '@ionic/angular';// Libreria mensaje Toas
import {NavigationExtras, Router, ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ApiService } from '../../servicios/api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario:any={}
  var_usuario: '';

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) {
  }

  publicaciones:any[];
  cantPublicaciones = 0;

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params=>{

      if(this.router.getCurrentNavigation().extras.state)
        {
          let data = this.router.getCurrentNavigation().extras.state.usuario;

          const getUser = {
            var_user: data
          }


          this.api.getPerfilusuario(getUser).subscribe(resultado =>
            {
              this.usuario = resultado.usuarios[0]
              this.var_usuario = this.usuario.VAR_USER

              const params = {
              USUARIO_INT_ID_USU: this.usuario.INT_ID_USU
              }

              this.api.getMisPublicaciones(params).subscribe((resultado)=>
              {
                this.publicaciones = resultado.publicaciones;
                this.cantPublicaciones = resultado.publicaciones.length;
                //console.log("publicaciones: ")
                //console.log(this.publicaciones)
                //console.log(this.cantPublicaciones)
                return this.publicaciones
              })
            })  
        } //Fin if
      }); //Fin ActivateRoute
  } // fin NgOninit




  irAPost(idPost){
    let navigationExtras: NavigationExtras = { 
      state:{
        iduser: this.var_usuario,
        idPost: idPost
      }
    };
    this.router.navigate(['tabs/view-post/'+ idPost], navigationExtras)
  }


} // fin
