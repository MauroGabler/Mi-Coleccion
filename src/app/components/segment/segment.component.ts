import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent implements OnInit {
  @ViewChild(IonSegment, { static:true })
  segment:IonSegment
  constructor() { }

  ngOnInit() {
    this.segment.value='login';
  }

}
