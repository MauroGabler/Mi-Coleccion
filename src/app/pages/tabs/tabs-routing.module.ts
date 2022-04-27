import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      }

    ]
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'explorar',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      }

    ]
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'publicar',
        loadChildren: () => import('../post/post.module').then( m => m.PostPageModule)
      }

    ]
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
