import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiBase = 'http://localhost:8080/api/';
  api = 'http://localhost:3000/API/';


  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }


  // Funcion permite obtener listado Categorias
  getColecciones(): Observable<any> {
    console.log('Api url  = ' + this.apiBase);
    return this.http.get(this.apiBase + 'colecciones').pipe();
  } // Cierre obtener Categorias

  consultarUsuario(data): Observable<any> {
    return this.http.get(`${this.api}usuario`, data).pipe();
  }

  registrarUsuario(data): Observable<any> {
    return this.http.post(`${this.api}usuario`, data).pipe();
  }

  login(data): Observable<any> {
    return this.http.post(`${this.api}login`, data).pipe();
  }

}
