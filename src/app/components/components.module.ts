import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SegmentComponent } from './segment/segment.component';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';



@NgModule({
  declarations: [SegmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageModule,
    RegisterPageModule
  ],
  exports: [SegmentComponent]
})
export class ComponentsModule { }
