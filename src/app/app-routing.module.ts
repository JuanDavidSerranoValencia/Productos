import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-productos',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'list-productos',
    loadChildren: () => import('./productos/list-productos/list-productos.module').then( m => m.ListProductosPageModule)
  },
  {
    path: 'add-producto',
    loadChildren: () => import('./productos/add-producto/add-producto.module').then( m => m.AddProductoPageModule)
  },
  {
    path: 'update-producto/:id',
    loadChildren: () => import('./productos/update-producto/update-producto.module').then( m => m.UpdateProductoPageModule)
  },
  {
    path: 'detail-producto/:id',
    loadChildren: () => import('./productos/detail-producto/detail-producto.module').then( m => m.DetailProductoPageModule)
  },
  {
    path: 'delete-producto/:id',
    loadChildren: () => import('./productos/delete-producto/delete-producto.module').then( m => m.DeleteProductoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
