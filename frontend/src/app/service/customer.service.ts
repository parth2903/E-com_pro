import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.module';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { Brand } from '../models/brand.module';

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

  getCategories(){
    return this.http.get<Category[]>(
      environment.apiUrl + "/customer/categories"
    );
  }

  getBrands(){
    return this.http.get<Brand[]>(
      environment.apiUrl + "/customer/brands"
    );
  }

  getProducts(searchCat: string, categoryId:string,page:number, pageSize:number, sortBy: string, sortOrder: number, brandId: string){
    return this.http.get<Product[]>(environment.apiUrl+`/customer/products?searchCat=${searchCat}&categoryId=${categoryId}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}`)
  }
}
