import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ToastController } from '@ionic/angular';// Libreria mensaje Toas
import { ApiService } from '../../servicios/api.service'; // Import de API 


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  usuario:any={}

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) {

   this.activateRoute.queryParams.subscribe(params=>{
     if(this.router.getCurrentNavigation().extras.state)
       {
         let data = this.router.getCurrentNavigation().extras.state.usuario;
         console.log("bienvenido home " + data )

         const getUser = {
           var_user: data
         }
         this.api.getPerfilusuario(getUser).subscribe(resultado =>{
            this.usuario = resultado.usuarios[0]

           console.log("rescatando usuario HOME > resultado");
           console.log(resultado);
           console.log("rescatando usuario HOME > this.user");
           console.log(this.usuario);
           
           })  
       }

     });

      


  }

  ngOnInit() {

  }



}
