import { Component} from '@angular/core';
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

  constructor(private productosServ: SProductosService, private loadingCtrl: LoadingController) { }

  ionViewWillEnter() {
    this.loadProductos();
  }

  async loadProductos(event?: InfiniteScrollCustomEvent) {

    const loading = await this.loadingCtrl.create({
      message: "Cargando productos...",
      spinner: "bubbles"

    }
    );
    await loading.present();

    this.productosServ.ListarProductos().subscribe(
      (resp: IProductos) => {
        loading.dismiss();
        let listString = JSON.stringify(resp)
        this.productos = JSON.parse(listString)
        event?.target.complete();
      },
      (err) => {
        console.log(err.message())
        loading.dismiss();
      }
    )


  }


}
