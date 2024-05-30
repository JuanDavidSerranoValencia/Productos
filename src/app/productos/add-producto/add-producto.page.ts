import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SProductosService } from 'src/app/services/sproductos.service';
import { IProducto } from 'src/app/interfaces/iproducto';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
})
export class AddProductoPage implements OnInit {
  newProducto: IProducto = {
    presupuesto: '',
    unidad: '',
    producto: '',
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
    fecha: '',
    proveedor: ''
  };

  constructor(
    private productoService: SProductosService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  calcularValorTotal() {
    this.newProducto.valorTotal = this.newProducto.cantidad * this.newProducto.valorUnitario;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  onSubmit(form: { valid: any; }) {
    if (form.valid) {
      this.calcularValorTotal();
      this.productoService.crearProductos(this.newProducto).subscribe(
        response => {
          console.log('Producto guardado:', response);
          this.router.navigateByUrl('list-productos');
        },
        error => {
          this.presentAlert('Error al guardar el producto. Inténtalo nuevamente.');
        }
      );
    } else {
      this.presentAlert('Por favor completar todos los campos.');
    }
  }
}
