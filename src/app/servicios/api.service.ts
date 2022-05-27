import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';       // Libreria mensaje Toas
import {NavigationExtras, Router,ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiBase = "http://localhost:3000/api/";


  constructor(private http:HttpClient,private router:Router,
              private activateRoute: ActivatedRoute, public toastController: ToastController)
               {


               } // Cierre constructor


  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  })
}


// Funcion permite obtener listado Categorias
getColecciones():Observable<any>{
  console.log("Api url  = " + this.apiBase);
  return this.http.get(this.apiBase + "categoria").pipe();
} // Cierre obtener Categorias


//Funcion recuperar perfil usuario registrado
getPerfilusuario(idusuario):Observable<any>{
  // idusuario =  pasar id usuario
  var url = "usuario/" + idusuario ;
  console.log("Api url  = " + this.apiBase + url );
  return this.http.get(this.apiBase + url).pipe();

} 



}//Final
