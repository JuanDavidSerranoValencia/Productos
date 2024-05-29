import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProductoPageRoutingModule } from './detail-producto-routing.module';

import { DetailProductoPage } from './detail-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProductoPageRoutingModule
  ],
  declarations: [DetailProductoPage]
})
export class DetailProductoPageModule {}
