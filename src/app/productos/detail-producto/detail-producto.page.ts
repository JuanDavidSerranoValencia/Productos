import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SProductosService } from 'src/app/services/sproductos.service';

@Component({
  selector: 'app-detail-producto',
  templateUrl: './detail-producto.page.html',
  styleUrls: ['./detail-producto.page.scss'],
})
export class DetailProductoPage {
  producto = {
    id: 0,
    presupuesto: "0",
    unidad: "0",
    producto: "0",
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
    fecha: "0",
    proveedor: "0"
  }


  constructor(private productosSer: SProductosService, private router: Router) { }


  ionViewWillEnter() {
    this.getProductoById(this.getIdFromUrl());
  }


  getIdFromUrl():Number {
    let url = this.router.url;
    let arr = url.split("/", 3);
    let id = parseInt(arr[2]);
    return id;
  }

  getProductoById(productoID: Number) {
    this.productosSer.getProductoById(productoID).subscribe(
      (resp: any) => {
        this.producto = {
          id: resp[0].id,
          presupuesto: resp[0].presupuesto,
          unidad: resp[0].unidad,
          producto: resp[0].producto,
          cantidad: resp[0].cantidad,
          valorUnitario: resp[0].valorUnitario,
          valorTotal: resp[0].valorTotal,
          fecha: resp[0].fecha,
          proveedor: resp[0].proveedor
        }
      }
    )
  }
}
