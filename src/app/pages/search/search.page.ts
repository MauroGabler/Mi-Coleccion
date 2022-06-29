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

  colecciones: any[];

  constructor(
    private api: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toast: ToastController) {

    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const data = this.router.getCurrentNavigation().extras.state.usuario;
      }
    });
  }

  ngOnInit() {
    this.api.getColecciones().subscribe((resultado) => {
      this.colecciones = resultado.categoria_coleccion;

      return resultado;
    });
  }

  irACategorias(idCategoria, nombreCategoria) {
    const navigationExtras: NavigationExtras = {
      state: {
        idCategoria,
        nombreCategoria
      }
    };
    this.router.navigate(['tabs/categories/' + idCategoria], navigationExtras);
  }

  async meGusta(id) {
    const params = { int_id_cat_colecc: id };

    this.api.guardarMeGusta(params).subscribe(res => {
      this.toastMsj('Te gusta!');
    });
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
