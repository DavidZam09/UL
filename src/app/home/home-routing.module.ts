import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('../init/inicio.module').then(m => m.InicioPageModule)
      },

      {
        path: '',
        redirectTo: '/ultra/inicio',
        pathMatch: 'full'
      },

    ]
  },

  {
    path: '',
    redirectTo: '/ultra/inicio',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
