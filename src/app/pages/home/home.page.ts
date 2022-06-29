import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ToastController } from '@ionic/angular';// Libreria mensaje Toas
import { ApiService } from '../../servicios/api.service'; // Import de API
import { Storage } from '@capacitor/storage';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  nombreUsuario: string;
  usuario: any = {};
  publicaciones;

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: ToastController,
    private aRoute: ActivatedRoute,
    private chRef: ChangeDetectorRef,
    private activateRoute: ActivatedRoute
  ) {

    this.activateRoute.queryParams.subscribe(params => {
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
    this.consultarPublicaciones();
    this.obtenerUsuario();
  }

  consultarPublicaciones() {
    this.api.consultarPublicaciones().subscribe(res => {
      this.publicaciones = res;
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
      state: {
        iduser: this.nombreUsuario,
        idPost: idPost
      }
    };
    this.router.navigate(['tabs/view-post/' + idPost], navigationExtras);
  }

  cerrarSesion() {
    Storage.clear();
    this.router.navigate(['/menu-auth']);
  }

  async obtenerUsuario() {
    const storage = await Storage.get({ key: 'logueado' });
    this.usuario = await JSON.parse(storage.value);
    this.nombreUsuario = await this.usuario.VAR_USER;
  }

  async meGusta(id) {
    const params = {
      publicacion_int_id_publi: id,
      usuario_int_id_usu: this.usuario.INT_ID_USU
    };

    this.api.guardarMeGusta(params).subscribe(res => {
      this.toastMsj('Te gusta!');
    });

    this.consultarPublicaciones();
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
