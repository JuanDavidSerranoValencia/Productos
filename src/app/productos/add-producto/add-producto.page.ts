import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/interfaces/iproducto';
import { IProductos } from 'src/app/interfaces/iproductos';
import { SProductosService } from 'src/app/services/sproductos.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
})

export class AddProductoPage implements OnInit {



  newProducto:IProducto ={
 
    presupuesto:"",
    unidad:"",
    producto:"",
    cantidad:0,
    valorUnitario:0,
    valorTotal:0,
    fecha:"",
    proveedor:""
  }

  constructor(
    private productoService:SProductosService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  crearProducto(){
    this.productoService.crearProductos(this.newProducto).subscribe()
    this.router.navigateByUrl( 'list-productos' )

  }
  
}
