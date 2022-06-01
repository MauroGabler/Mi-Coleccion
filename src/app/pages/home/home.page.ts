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
    private chRef: ChangeDetectorRef
    ) {


  }

  ngOnInit() {

    this.consultarPublicaciones();
    this.obtenerUsuario();
  }

  consultarPublicaciones() {

    this.api.consultarPublicaciones().subscribe(res => {
      this.publicaciones = res;
      // this.publicaciones = JSON.stringify(this.publicaciones);
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
    const valores = JSON.parse(storage.value);
    this.nombreUsuario = valores.VAR_USER;
  }

  async meGusta(id) {

    const params = {
      int_id_publi: id
    };
    this.api.guardarMeGusta(params).subscribe(res => {
      this.toastMsj('Te gusta!');
    });

    // this.chRef.detectChanges();
    // this.zone.run(() => {});
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

  // loadData(event) {
  //   setTimeout(() => {
  //     console.log('Listo');
  //     event.target.complete();

  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     if (data.length === 1000) {
  //       event.target.disabled = true;
  //     }
  //   }, 500);
  // }
}
