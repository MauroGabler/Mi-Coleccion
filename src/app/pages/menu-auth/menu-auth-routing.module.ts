import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAuthPage } from './menu-auth.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAuthPageRoutingModule {}
