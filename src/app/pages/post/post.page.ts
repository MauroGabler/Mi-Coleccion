import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';
import axios from 'axios';



@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  categorias = [];

  tipoPublicacion: number;
  idUsuario: number;
  precioInicial: number;
  precioCompraYa: number;
  // descripcionVenta = 'preuasne';
  coleccionCompleta = false;
  esSubasta = false;

  publicacion = {
    var_titulo_publi: '',
    var_des_publi: '',
    bool_venta: 0,
    bool_discusion: 0,
    bool_evento: 0,
    bool_coleccion: 0,
    usuario_int_id_usu: 0,
    cat_col_int_id_cat_colecc: '',
    IMG_PUBLI: '',
    IMG_PUBLI2: '',
    IMG_PUBLI3: '',
  };

  venta = {
    nro_precio: 0,
    bool_ofertar: 0,
    nro_precio_oferta_min: 0,
    bool_subasta: 0,
    nro_precio_compra_ya: 0,
    publicacion_int_id_publi: 0
  };

  constructor(
    private api: ApiService,
    private toast: ToastController,
  ) { }

  url_server: any[];
  respuesta: any ;


  ngOnInit() {

    this.consultarCategorias();

    let array = [];
    this.url_server = array;

    const CLOUDINARY_URL="https://api.cloudinary.com/v1_1/micoleccion/image/upload";
    const preset = "t4bru0ez";
    const imageUploader = document.getElementById("file-input");

    imageUploader.addEventListener('change', async(e:Event) =>{
      const file = (e.target as HTMLInputElement).files[0];

      const formData = new FormData();
      formData.append('file',file);
      formData.append('upload_preset',preset);
      const res = await axios.post(CLOUDINARY_URL,formData,{
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      });

      console.log(this.url_server)

      if (array.length < 3) {
        array.push(res.data.secure_url);
        if(array.length === 3){
          imageUploader.setAttribute('disabled','');
        }
      }

    });


    
    
  }

  consultarCategorias() {
    this.api.consultarCategorias().subscribe(msg => {
      this.categorias = msg.categoria_coleccion;
    });
  }

  async publicarVenta() {

    console.log(this.publicacion.var_des_publi);
    let esVenta = false;
    const dxUsuario = await Storage.get({ key: 'logueado' });

    this.idUsuario = JSON.parse(dxUsuario.value).INT_ID_USU;

    this.publicacion.usuario_int_id_usu = this.idUsuario;

    this.publicacion.IMG_PUBLI = this.url_server[0];
    this.publicacion.IMG_PUBLI2 = this.url_server[1];
    this.publicacion.IMG_PUBLI3 = this.url_server[2];

    console.log(this.publicacion.IMG_PUBLI)
    
    if (this.tipoPublicacion === 1) {
      esVenta = true;
      this.venta.nro_precio = this.precioInicial;
      this.venta.nro_precio_compra_ya = this.precioCompraYa;
    };

    if (this.tipoPublicacion === 2) { this.publicacion.bool_discusion = 1; }
    else if (this.tipoPublicacion === 3) { this.publicacion.bool_evento = 1; }

    this.coleccionCompleta && (this.publicacion.bool_coleccion = 1);

    console.log("asd")
    console.log(this.publicacion)
    this.api.guardarPublicacion(this.publicacion).subscribe(msg => {

      this.toastMsj(msg.mensaje);
      if (esVenta) {

        this.api.guardarVenta(this.venta).subscribe(res => {
          this.toastMsj(res.mensaje);
        });
      }
    });
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
