import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  categorias = [];

  publicacion = {
    var_titulo_publi: '',
    var_des_publi: '',
    bool_venta: 1,
    usuario_int_id_usu: '',
    cat_col_int_id_cat_col: ''
  };

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.consultarCategorias();
  }

  consultarCategorias() {
    this.api.consultarCategorias().subscribe(msg => {
      this.categorias = msg.categoria_coleccion;
      console.log(this.categorias);
    });
  }

  publicarVenta() {

    this.api.guardarPublicacion(this.publicacion).subscribe(msg => {

    });
  }

}
