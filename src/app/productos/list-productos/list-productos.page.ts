import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { IProductos } from 'src/app/interfaces/iproductos';
import { SProductosService } from 'src/app/services/sproductos.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.page.html',
  styleUrls: ['./list-productos.page.scss'],
})
export class ListProductosPage {

  productos: IProductos[] = [];
  filteredProductos: IProductos[] = [];
  filtro = {
    unidad: '',
    producto: ''
  };

  constructor(private productosServ: SProductosService, private loadingCtrl: LoadingController) { }

  ionViewWillEnter() {
    this.loadProductos();
  }

  async loadProductos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: "Cargando productos...",
      spinner: "bubbles"
    });
    await loading.present();

    this.productosServ.ListarProductos().subscribe(
      (resp: IProductos[]) => {
        loading.dismiss();
        this.productos = resp;
        this.filteredProductos = resp; // Inicialmente, mostrar todos los productos
        event?.target.complete();
      },
      (err) => {
        console.log(err.message);
        loading.dismiss();
      }
    );
  }

  applyFilter() {
    this.filteredProductos = this.productos.filter(producto => {
      return (!this.filtro.unidad || producto.unidad.toLowerCase().includes(this.filtro.unidad.toLowerCase())) &&
             (!this.filtro.producto || producto.producto.toLowerCase().includes(this.filtro.producto.toLowerCase()));
    });
  }

  onFilterChange() {
    this.applyFilter();
  }

  clearFilters() {
    this.filtro = {
      unidad: '',
      producto: ''
    };
    this.filteredProductos = this.productos;
  }
}
