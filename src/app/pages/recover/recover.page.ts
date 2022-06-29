import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  form: FormGroup;
  perfil: any;
  email: string;
  user: string;

  constructor(
    private api: ApiService,
    private fb:FormBuilder,
    private router: Router,
    private toast: ToastController

  ) {}
  

  ngOnInit() {

  }

  consultarUsuario () {

    const param = {
      var_user: this.user
    }

    this.api.getPerfilusuario(param).subscribe(res => {
      console.log(param)
      this.perfil = res

      console.log(this.perfil)
      return this.perfil

    });
  }

  onSubmit() {

  }

}
