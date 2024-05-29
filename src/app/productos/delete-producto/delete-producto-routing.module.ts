import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteProductoPage } from './delete-producto.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteProductoPageRoutingModule {}
