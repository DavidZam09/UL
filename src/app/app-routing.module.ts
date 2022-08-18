import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'ultra',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  
  {
    path: 'create-product',
    loadChildren: () => import('./create-product/create-product.module').then(m => m.CreateProductPageModule)
  },
  {
    path: 'product-management/:id',
    loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementPageModule)
  },
  {
    path: 'productmanagement',
    loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryPageModule)
  },
  {
    path: 'usermanagement',
    loadChildren: () => import('./usermanagement/usermanagement.module').then(m => m.UsermanagementPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then(m => m.ReportPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
