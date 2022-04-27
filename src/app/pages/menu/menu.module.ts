import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { LoginModule } from '../../component/login/login.module';
import { RegisterModule } from '../../component/register/register.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    LoginModule,
    RegisterModule,
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
