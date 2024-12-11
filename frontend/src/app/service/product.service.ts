import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http=inject(HttpClient);
  constructor() { }

  getAllProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"/product")
  }

  getProductById(id: String){
    return this.http.get<Product>(environment.apiUrl+"/product/" + id)
  }

  addProduct(model: Product){
    return this.http.post(environment.apiUrl+"/product", model)
  }

  updateProduct(id: String, model: Product){
    return this.http.put(environment.apiUrl+"/product/"+id , model);
  }

  deleteProduct(id: String){
    return this.http.delete(environment.apiUrl+ '/product/' + id)
  }
}
