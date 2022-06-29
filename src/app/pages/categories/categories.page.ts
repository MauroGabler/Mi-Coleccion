import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  nombreUsuario: string;
  usuario: any = {};
  publicaciones: any[];
  publicaciones_filtro: any[];
  datos_categoria: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toast: ToastController,
    private aRoute: ActivatedRoute) {

    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.datos_categoria = this.router.getCurrentNavigation().extras.state;
      }
      if (this.router.getCurrentNavigation().extras.state) {
        const data = this.router.getCurrentNavigation().extras.state.usuario;
        const getUser = { var_user: data };

        this.api.getPerfilusuario(getUser).subscribe(resultado => {
          this.usuario = resultado.usuarios[0];
          this.nombreUsuario = this.usuario.VAR_USER;
        });
      }
    });
  }

  ngOnInit() {
    this.getPublicaciones();
  }

  async getPublicaciones() {
    const getPostCat = {
      CAT_COL_INT_ID_CAT_COLECC: this.datos_categoria.idCategoria
    };

    this.api.getMisPublicaciones(getPostCat).subscribe(res => {
      this.publicaciones = res.publicaciones;
      return this.publicaciones;
    });
  }

  reloadPage() {
    this.aRoute.params && this.aRoute.params.subscribe(params => {
      const id = params.idPost;
      this.router.navigate([`view-post/${id}`]);
    });
  }

  irAPost(idPost) {
    const navigationExtras: NavigationExtras = {
      state: { idPost: idPost }
    };
    this.router.navigate(['tabs/view-post/' + idPost], navigationExtras);
  }

  async meGusta(id) {
    const params = { int_id_publi: id };

    this.api.guardarMeGusta(params).subscribe(res => {
      this.toastMsj('Te gusta!');
    });

    this.getPublicaciones();
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
