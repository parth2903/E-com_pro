import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.module';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getNewProducts(){
    return this.http.get<Product[]>(
      environment.apiUrl + "/customer/new-products"
    );
  }

  getFeaturedProducts(){
    return this.http.get<Product[]>(
      environment.apiUrl + "/customer/featured-products"
    );
  }
}
