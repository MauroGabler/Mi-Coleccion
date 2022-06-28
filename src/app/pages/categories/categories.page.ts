import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  publicaciones: any[];
  publicaciones_filtro: any[];
  datos_categoria: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,) { 

    this.activateRoute.queryParams.subscribe(params=>{
    if(this.router.getCurrentNavigation().extras.state)
      {
        this.datos_categoria = this.router.getCurrentNavigation().extras.state; 
        console.log(this.datos_categoria)
        
      }
    });
  }

  ngOnInit() {

    this.getPublicaciones();

  }

  async getPublicaciones(){
    const getPostCat = this.datos_categoria.idCategoria


    this.api.getPublicacionesXCategorias(getPostCat).subscribe(res => {
      this.publicaciones_filtro = res;
      console.log(this.publicaciones_filtro.length)
    });

    this.api.consultarPublicaciones().subscribe(res => {
      this.publicaciones = res;
      console.log(this.publicaciones.length)
    });
  }

}
