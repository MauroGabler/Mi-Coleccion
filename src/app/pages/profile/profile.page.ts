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

  constructor(private api:ApiService, private router: Router) 
  { }

  perfilUsuario: any[];
  seguidoresUsuario: any [];
  publicacionesUsuario: any [];

  ngOnInit() {
    var iddtest = 1
    
    
    this.api.getPerfilusuario(iddtest).subscribe((resultado)=>
    {
      this.perfilUsuario = resultado.result
      console.log(this.perfilUsuario)
      return resultado.result
    })
    

  } // fin NgOninit

}
