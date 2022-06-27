import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RutaProtegidaGuard } from './ruta-protegida.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu-auth',
    pathMatch: 'full'
  },
  {
    path: 'recover',
    loadChildren: () => import('./pages/recover/recover.module').then( m => m.RecoverPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [RutaProtegidaGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./pages/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'menu-auth',
    loadChildren: () => import('./pages/menu-auth/menu-auth.module').then( m => m.MenuAuthPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'profile/:user',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    //canActivate: [RutaProtegidaGuard]
  },
  {
    path: 'view-post/:idPost',
    loadChildren: () => import('./pages/view-post/view-post.module').then( m => m.ViewPostPageModule)
  },
  {
    path: 'categories/:idCategoria',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
