 # Proyecto CRUD con Ionic y Angular

Este proyecto es una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar productos, construida con Ionic y Angular. Utiliza `json-server` para simular una API RESTful.

## Requisitos Previos

- Node.js y npm instalados
- Ionic CLI instalado

## Instalación y Configuración del Proyecto

### 1. Instalar Angular CLI

```bash
npm install -g @angular/cli
```

### 2. Instalar Ionic CLI

```bash
npm install -g @ionic/cli
```

### 3. Crear un Nuevo Proyecto Ionic con Plantilla `sidemenu`

```bash
ionic start nombre-del-proyecto sidemenu --type=angular
```

### 4. Instalar `json-server`

```bash
npm install -g json-server@0.17.4
```

### 5. Crear el Archivo `db.json`

En el directorio raíz del proyecto, crea un archivo `db.json` con el siguiente contenido:

```json
{
  "productos": [
        {
      "presupuesto": "fdf",
      "unidad": "sddfsd",
      "producto": "papas",
      "cantidad": 4,
      "valorUnitario": 3,
      "valorTotal": 12,
      "fecha": "2024-05-03",
      "proveedor": "fdsfds",
      "id": 2
    }
]
}
```

### 6. Iniciar `json-server`

```bash
json-server --watch db.json --port 3000
```

## Crear las Páginas Necesarias

### 1. Crear Página para Listar Productos

```bash
ionic generate page list-productos
```

### 2. Crear Página para Agregar Producto

```bash
ionic generate page add-producto
```

### 3. Crear Página para Editar Producto

```bash
ionic generate page edit-producto
```

### 4. Crear Página para Eliminar Producto

```bash
ionic generate page delete-producto
```

### 5. Crear Página para Detalles del Producto

```bash
ionic generate page detail-producto
```

## Crear el Servicio para Manejar Productos

### 1. Generar el Servicio

```bash
ionic generate service services/sproductos
```

Para implementar una aplicación CRUD con Ionic y Angular que gestione productos, es esencial comprender los pasos para configurar el servicio, las interfaces, las páginas y las rutas. A continuación, se detalla la implementación y configuración necesarias para completar esta tarea:

## Implementación del Servicio

El servicio `SProductosService` maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los productos, interactuando con una API RESTful.

### `sproductos.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProducto } from '../interfaces/iproducto';

@Injectable({
  providedIn: 'root'
})
export class SProductosService {
  private apiURL = `${environment.apiURL}/productos`;

  constructor(private http: HttpClient) { }

  ListarProductos(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.apiURL);
  }

  crearProductos(newProducto: IProducto): Observable<IProducto> {
    return this.http.post<IProducto>(this.apiURL, newProducto);
  }

  getProductoById(id: Number): Observable<IProducto> {
    return this.http.get<IProducto>(`${this.apiURL}/${id}`);
  }

  updateProducto(producto: IProducto): Observable<IProducto> {
    return this.http.put<IProducto>(`${this.apiURL}/${producto.id}`, producto);
  }

  deleteProducto(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
```

### Interfaces

Las interfaces definen la estructura de los datos que se manejarán en la aplicación.

#### `iproducto.ts`

```typescript
export interface IProducto {
  id?: number;
  presupuesto: string;
  unidad: string;
  producto: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  fecha: string;
  proveedor: string;
}
```

## Implementación de las Páginas

### Página para Listar Productos

Esta página muestra una lista de productos obtenidos del servicio.

#### `list-productos.page.ts`

```typescript
import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { IProducto } from 'src/app/interfaces/iproducto';
import { SProductosService } from 'src/app/services/sproductos.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.page.html',
  styleUrls: ['./list-productos.page.scss'],
})
export class ListProductosPage {

  productos: IProducto[] = [];

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
      (resp: IProducto[]) => {
        loading.dismiss();
        this.productos = resp;
        event?.target.complete();
      },
      (err) => {
        console.log(err.message);
        loading.dismiss();
      }
    );
  }
}
```

### Página para Agregar Producto

Esta página permite agregar un nuevo producto a través de un formulario.

#### `add-producto.page.ts`

```typescript
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
      this.presentAlert('Por favor completa todos los campos.');
    }
  }
}
```

### Página para Editar Producto

Esta página permite editar los detalles de un producto existente.

#### `update-producto.page.ts`

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SProductosService } from 'src/app/services/sproductos.service';

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.page.html',
  styleUrls: ['./update-producto.page.scss'],
})
export class UpdateProductoPage {
  producto = {
    id: 0,
    presupuesto: '',
    unidad: '',
    producto: '',
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
    fecha: '',
    proveedor: ''
  };

  constructor(private productoServ: SProductosService, private router: Router) { }

  ionViewWillEnter() {
    this.getProductoById(this.getIdFromUrl());
  }

  getIdFromUrl(): Number {
    let url = this.router.url;
    let arr = url.split("/", 3);
    let id = parseInt(arr[2]);
    return id;
  }

  getProductoById(productoID: Number) {
    this.productoServ.getProductoById(productoID).subscribe(
      (resp: IProducto) => {
        this.producto = resp;
      }
    );
  }

  calcularValorTotal() {
    this.producto.valorTotal = this.producto.cantidad * this.producto.valorUnitario;
  }

  updateProducto() {
    this.productoServ.updateProducto(this.producto).subscribe(
      () => {
        this.router.navigateByUrl('/list-productos');
      }
    );
  }
}
```

### Página para Eliminar Producto

Esta página permite eliminar un producto existente.

#### `delete-producto.page.ts`

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SProductosService } from 'src/app/services/sproductos.service';

@Component({
  selector: 'app-delete-producto',
  templateUrl: './delete-producto.page.html',
  styleUrls: ['./delete-producto.page.scss'],
})
export class DeleteProductoPage {
  producto = {
    id: 0,
    presupuesto: '',
    unidad: '',
    producto: '',
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
    fecha: '',
    proveedor: ''
  };

  constructor(private productoServ: SProductosService, private router: Router) { }

  ionViewWillEnter() {
    this.getProductoById(this.getIdFromUrl());
  }

  getIdFromUrl(): Number {
    let url = this.router.url;
    let arr = url.split("/", 3);
    let id = parseInt(arr[2]);
    return id;
  }

  getProductoById(productoID: Number) {
    this.productoServ.getProductoById(productoID).subscribe(
      (resp: IProducto) => {
        this.producto = resp;
      }
    );
  }

  deleteProducto() {
    this.productoServ.deleteProducto(this.producto.id).subscribe(
      () => {
        this.router.navigateByUrl('/list-productos');
      }
    );
  }
}
```

### Página de Detalles del Producto

Esta página muestra los detalles de un producto específico.

#### `detail-producto.page.ts`

```typescript
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
    presupuesto: '',
    unidad: '',
    producto: '',
    cantidad: 0,
    valorUnitario: 0,
    valorTotal: 0,
    fecha: '',
    proveedor: ''
  };

  constructor(private productosSer: SProductosService, private router: Router) { }

  ionViewWillEnter() {
    this.getProductoById(this.getIdFromUrl());
  }

  getIdFromUrl(): Number {
    let url = this.router.url;
    let arr = url.split("/", 3);
    let id = parseInt(arr[2]);
    return id;
  }

  getProductoById(productoID: Number) {
    this.productos

Ser.getProductoById(productoID).subscribe(
      (resp: IProducto) => {
        this.producto = resp;
      }
    );
  }
}
```

## Configuración de Rutas

Las rutas de la aplicación deben estar configuradas para navegar entre las diferentes páginas de productos.

### `app-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list-productos', pathMatch: 'full' },
  { path: 'list-productos', loadChildren: () => import('./list-productos/list-productos.module').then(m => m.ListProductosPageModule) },
  { path: 'add-producto', loadChildren: () => import('./add-producto/add-producto.module').then(m => m.AddProductoPageModule) },
  { path: 'edit-producto/:id', loadChildren: () => import('./edit-producto/edit-producto.module').then(m => m.EditProductoPageModule) },
  { path: 'delete-producto/:id', loadChildren: () => import('./delete-producto/delete-producto.module').then(m => m.DeleteProductoPageModule) },
  { path: 'detail-producto/:id', loadChildren: () => import('./detail-producto/detail-producto.module').then(m => m.DetailProductoPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Configuración del Entorno

Definir la URL de la API en el archivo de configuración del entorno.

### `environment.ts`

```typescript
export const environment = {
  production: false,
  apiURL: 'http://localhost:3000'
};
```

### Explicación

1. **Servicio `SProductosService`**: Este servicio se encarga de manejar las operaciones CRUD para los productos. Utiliza `HttpClient` para hacer peticiones HTTP a la API REST, cuya URL base se define en el archivo de entorno.

2. **Interfaces**: La interfaz `IProducto` define la estructura del objeto producto, lo que facilita la tipificación de datos en TypeScript.

3. **Páginas**:
   - **Listar Productos**: Obtiene y muestra una lista de productos.
   - **Agregar Producto**: Permite crear un nuevo producto mediante un formulario.
   - **Editar Producto**: Permite editar los detalles de un producto existente.
   - **Eliminar Producto**: Permite eliminar un producto existente.
   - **Detalles del Producto**: Muestra los detalles de un producto específico.

4. **Rutas**: Las rutas definen cómo se navega entre las diferentes páginas de la aplicación. Cada ruta está asociada con un módulo de página específico.

5. **Configuración del Entorno**: El archivo `environment.ts` define variables de entorno, como la URL de la API, que se utilizan en toda la aplicación.

Este esquema proporciona una base robusta para implementar y gestionar productos en una aplicación Ionic/Angular.

## Iniciar la Aplicación

### 1. Iniciar el Servidor de Desarrollo

```bash
ionic serve
```

### 2. Asegurarse de que `json-server` esté Corriendo

```bash
json-server --watch db.json --port 3000
```

## Conclusión

Esta guía proporciona los pasos para configurar una aplicación CRUD con Ionic y Angular, incluyendo la instalación de herramientas, la creación de páginas, la configuración de `json-server`, y la implementación de un servicio para manejar las operaciones CRUD. Con estos pasos, tendrás una aplicación funcional que puede listar, agregar, editar y eliminar productos.

## Explicación de Métodos

### Servicio de Productos (`sproductos.service.ts`)

- **ListarProductos**: Obtiene la lista de todos los productos.
- **crearProductos**: Crea un nuevo producto.
- **getProductoById**: Obtiene los detalles de un producto específico por su ID.
- **updateProducto**: Actualiza la información de un producto.
- **deleteProducto**: Elimina un producto específico por su ID.

### Página para Listar Productos (`list-productos.page.ts`)

- **ionViewWillEnter**: Método del ciclo de vida de Ionic que se llama cuando la página está a punto de entrar y convertirse en la página activa.
- **loadProductos**: Método para cargar los productos desde el servidor y mostrarlos en la lista.

### Página para Agregar Producto (`add-producto.page.ts`)

- **calcularValorTotal**: Calcula el valor total del producto multiplicando la cantidad por el valor unitario.
- **presentAlert**: Muestra una alerta en la pantalla.
- **onSubmit**: Método que se ejecuta al enviar el formulario para agregar un nuevo producto.

### Página para Editar Producto (`update-producto.page.ts`)

- **calcularValorTotal**: Calcula el valor total del producto multiplicando la cantidad por el valor unitario.
- **updateProducto**: Método que se ejecuta al enviar el formulario para actualizar un producto.

### Página para Eliminar Producto (`delete-producto.page.ts`)

- **deleteProducto**: Método que se ejecuta para eliminar un producto.

### Página de Detalles del Producto (`detail-producto.page.ts`)

- **getProductoById**: Método para obtener los detalles de un producto específico por su ID y mostrarlo en la página.
