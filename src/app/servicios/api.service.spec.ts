import { TestBed } from '@angular/core/testing';
import { DefaultUrlSerializer } from '@angular/router';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });


it('prueba de servicio GetColecciones ', () =>{
  var expectedDetail: any = {
    "result":[
      {
        "id":"1",
        "nombre_coleccion": "videojuego",
        "coleccion_activa": "true"
      }
    ]
};

    service.getColecciones().subscribe((detalle) => {
      console.log("detalle usuario: " +  detalle.result[0].correo)
      expect(detalle.result[0].correo).toBe("test")
    });
    });

});
