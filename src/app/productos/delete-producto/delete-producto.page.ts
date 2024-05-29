import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SProductosService } from 'src/app/services/sproductos.service';

@Component({
  selector: 'app-delete-producto',
  templateUrl: './delete-producto.page.html',
  styleUrls: ['./delete-producto.page.scss'],
})
export class DeleteProductoPage  {

  producto ={
    id:0,
    presupuesto:"",
    unidad:"",
    producto:"",
    cantidad:0,
    valorUnitario:0,
    valorTotal:0,
    fecha:"",
    proveedor:""
  }
  constructor(private productoServ:SProductosService, private  router:Router) { }
  
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
    this.productoServ.getProductoById(productoID).subscribe(
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
  
  deleteProducto(){
    this.productoServ.deleteProducto( this.producto ).subscribe()
    this.router.navigateByUrl( "/list-productos" );

  }

}
