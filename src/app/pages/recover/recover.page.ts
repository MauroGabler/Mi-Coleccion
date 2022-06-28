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

  constructor(
    private api: ApiService,
    private fb:FormBuilder,
    private router: Router,
    private toast: ToastController

  ) { }

  ngOnInit() {
  }

}
