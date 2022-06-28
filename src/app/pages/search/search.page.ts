import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ToastController } from '@ionic/angular';// Libreria mensaje Toas
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {


  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) {
    
    this.activateRoute.queryParams.subscribe(params=>{
    if(this.router.getCurrentNavigation().extras.state)
      {
        let data = this.router.getCurrentNavigation().extras.state.usuario;
        console.log("bienvenido search " + data)
      }
    });

  }

  colecciones: any[];

  ngOnInit() {
    
    this.api.getColecciones().subscribe((resultado)=>
    {
      this.colecciones = resultado.categoria_coleccion;
      //console.log("colecciones: ")
      //console.log(this.colecciones)
      return resultado
      
    })



  } // fin NGOinit
}
