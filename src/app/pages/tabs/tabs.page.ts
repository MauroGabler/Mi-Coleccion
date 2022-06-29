import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  usuario: any = {};

  constructor(
    private api: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {

    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const data = this.router.getCurrentNavigation().extras.state.usuario;
        const getUser = { var_user: data };

        this.api.getPerfilusuario(getUser).subscribe(resultado => {
          this.usuario = resultado.usuarios[0];
        });
      }
    });
  }

  ngOnInit() {
    this.obtenerUsuario();
  }

  cerrarSesion() {
    Storage.clear();
    this.router.navigate(['/menu-auth']);
  }

  async Perfilusuario() {
    const storage = await Storage.get({ key: 'logueado' });
    const usuario = await JSON.parse(storage.value);
    const nombreUsuario = await usuario.VAR_USER;

    const navigationExtras: NavigationExtras = {
      state: { usuario: nombreUsuario }
    };

    this.router.navigate([`tabs/profile/${nombreUsuario}`], navigationExtras);
  }

  async obtenerUsuario() {
    const storage = await Storage.get({ key: 'logueado' });
    this.usuario = await JSON.parse(storage.value);
  }

}
