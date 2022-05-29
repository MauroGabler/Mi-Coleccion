import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ToastController } from '@ionic/angular';// Libreria mensaje Toas
import { ApiService } from '../../servicios/api.service'; // Import de API 

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  usuario:any={}

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

             //console.log("rescatando usuario TABS > resultado");
             //console.log(resultado);
             //console.log("rescatando usuario TABS > this.user");
             //console.log(this.usuario);

            })  
        }

      });


  }

  ngOnInit() {
  }



  Perfilusuario(){
    //console.log("usuario a pasar" )
    //console.log(this.usuario.VAR_USER )
    let navigationExtras: NavigationExtras = { // Creacion de un contexto para pasar a otro sitio 
      state:{
        usuario: this.usuario.VAR_USER
      }
    };

    this.router.navigate(['tabs/profile/'+ this.usuario.VAR_USER], navigationExtras)

  }



}
