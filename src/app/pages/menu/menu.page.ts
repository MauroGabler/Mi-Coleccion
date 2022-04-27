import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment:IonSegment;

  constructor() { }

  ngOnInit() {
    this.segment.value = 'iniciar';
  }

}
