import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProductoPage } from './update-producto.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProductoPageRoutingModule {}
