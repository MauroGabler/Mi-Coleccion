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
  
  usuarioid: 0;

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) {
  }

  publicaciones:any[];

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state)
        {
          let data = this.router.getCurrentNavigation().extras.state.usuario;
          const getUser = {
            var_user: data
          }
          this.api.getPerfilusuario(getUser).subscribe(resultado =>{
            this.usuario = resultado.usuarios[0]
            this.usuarioid = this.usuario.INT_ID_USU

            const params = {
              USUARIO_INT_ID_USU: this.usuario.INT_ID_USU
            }

            this.api.getMisPublicaciones(params).subscribe((resultado)=>
            {
              this.publicaciones = resultado.publicaciones;
              console.log("publicaciones: ")
              console.log(this.publicaciones)
              return resultado
            })
          })  
        }
        

      });

      

  } // fin NgOninit
} // fin
