import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAuthPageRoutingModule } from './menu-auth-routing.module';

import { MenuAuthPage } from './menu-auth.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAuthPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuAuthPage]
})
export class MenuAuthPageModule {}
