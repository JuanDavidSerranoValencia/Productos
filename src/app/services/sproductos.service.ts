import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductos } from '../interfaces/iproductos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProducto } from '../interfaces/iproducto';

@Injectable({
  providedIn: 'root'
})
export class SProductosService {

  constructor(private http: HttpClient) { }


  ListarProductos():Observable<IProductos>{
    return this.http.get<IProductos>(`${environment.apiURL}/productos`)
  }

  crearProductos(newProducto: IProducto): Observable<IProducto> {
    return this.http.post<IProducto>(`${environment.apiURL}/productos`, newProducto);
  }

  getProductoById(id:Number):Observable<IProductos>{
    return this.http.get<IProductos>(`${environment.apiURL}/productos/?id=${id}`)
  }

  updateProducto(producto: any):Observable<IProductos>{
    return this.http.put< IProductos>(`${environment.apiURL}/productos/${producto.id}`,producto)

  }

  deleteProducto(producto: any):Observable<IProductos>{
    return this.http.delete<IProductos>(`${environment.apiURL}/productos/${producto.id}`)

  }

}
