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
  publicaciones:any={}
  usuarioid: 0;

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) {
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
            
             //console.log("rescatando usuario PERFIL > resultado");
             //console.log(resultado);
             //console.log("rescatando usuario PERFIL > this.user");
             //console.log(this.usuario);
             //console.log("id usuario: " +  this.usuario.INT_ID_USU )
             //console.log("id nick: " +  this.usuario.VAR_USER )
            })  

        }
        

      });



    



  }

  ngOnInit() {
    
    this.api.getMisPublicaciones(this.usuarioid).subscribe((resultado)=>
    {
      this.publicaciones = resultado;
      console.log(resultado)
      console.log("id usuario pasado: " + this.usuarioid)
      return resultado   
    })


  } // fin NgOninit





} // fin
