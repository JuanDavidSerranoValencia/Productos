import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProductoPageRoutingModule } from './update-producto-routing.module';

import { UpdateProductoPage } from './update-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateProductoPageRoutingModule
  ],
  declarations: [UpdateProductoPage]
})
export class UpdateProductoPageModule {}
