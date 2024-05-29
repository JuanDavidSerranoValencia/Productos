import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteProductoPageRoutingModule } from './delete-producto-routing.module';

import { DeleteProductoPage } from './delete-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteProductoPageRoutingModule
  ],
  declarations: [DeleteProductoPage]
})
export class DeleteProductoPageModule {}
