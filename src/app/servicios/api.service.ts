import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = 'http://localhost:3000/api/';


  constructor(private http: HttpClient,
  ) { }


  // Funcion permite obtener listado Categorias
  getColecciones(): Observable<any> {
    console.log("Api url  = " + this.api);
    return this.http.get(this.api + "categoria").pipe();
  } // Cierre obtener Categorias


  //Funcion recuperar perfil usuario registrado
  getPerfilusuario(data): Observable<any> {
    return this.http.post(`${this.api}consultarusuario`, data).pipe();
  }

  //Funciones Login //
  consultarUsuario(data): Observable<any> {
    return this.http.get(`${this.api}usuario`, data).pipe();
  }

  registrarUsuario(data): Observable<any> {
    return this.http.post(`${this.api}usuario`, data).pipe();
  }

  login(data): Observable<any> {
    return this.http.post(`${this.api}login`, data).pipe();
  }

  // Registro
  consultarNombreUsuario(data): Observable<any> {
    return this.http.post(`${this.api}verificarNombreUsuario`, data).pipe();
  }

  // Publicacion
  consultarPublicaciones(data): Observable<any> {
    return this.http.get(`${this.api}publicacion`, data).pipe();
  }

  guardarPublicacion(data): Observable<any> {
    return this.http.post(`${this.api}publicacion`, data).pipe();
  }

  modificarPublicacion(data): Observable<any> {
    return this.http.put(`${this.api}publicacion`, data).pipe();
  }

  // Me Gusta
  consultarMeGusta(data): Observable<any> {
    return this.http.get(`${this.api}like`, data).pipe();
  }

  guardarMeGusta(data): Observable<any> {
    return this.http.post(`${this.api}like`, data).pipe();
  }

  modificarMeGusta(data): Observable<any> {
    return this.http.put(`${this.api}like`, data).pipe();
  }

  // Categorías
  consultarCategorias(data = null): Observable<any> {
    if (data) {
      return this.http.get(`${this.api}categoria`, data).pipe();
    } else {
      return this.http.get(`${this.api}categoria`).pipe();
    }
  }

  guardarCategoria(data): Observable<any> {
    return this.http.post(`${this.api}categoria`, data).pipe();
  }

  modificarCategoria(data): Observable<any> {
    return this.http.put(`${this.api}categoria`, data).pipe();
  }



  //Funcion recuperar publicaciones por usuario
  getMisPublicaciones(data): Observable<any> {
    return this.http.post(`${this.api}publicacionxusuario`, data).pipe();
  }

  // Artículos
  consultarArticulos(data): Observable<any> {
    return this.http.get(`${this.api}articulos`, data).pipe();
  }

  guardarArticulo(data): Observable<any> {
    return this.http.post(`${this.api}articulo`, data).pipe();
  }

  modificarArticulo(data): Observable<any> {
    return this.http.put(`${this.api}articulo`, data).pipe();
  }

  // Comentarios
  consultarComentarios(data): Observable<any> {
    return this.http.get(`${this.api}comentario`, data).pipe();
  }

  guardarComentario(data): Observable<any> {
    return this.http.post(`${this.api}comentario`, data).pipe();
  }

  modificarComentario(data): Observable<any> {
    return this.http.put(`${this.api}comentario`, data).pipe();
  }

  // Valoraciones
  consultarValoraciones(data): Observable<any> {
    return this.http.get(`${this.api}valoracion`, data).pipe();
  }

  guardarValoracion(data): Observable<any> {
    return this.http.post(`${this.api}valoracion`, data).pipe();
  }

  modificarValoracion(data): Observable<any> {
    return this.http.put(`${this.api}valoracion`, data).pipe();
  }

}
