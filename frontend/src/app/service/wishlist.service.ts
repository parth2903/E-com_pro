import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.module';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http=inject(HttpClient)
  wishlists: Product[] = []
  constructor() { }

  init(){
    return this.getWishlists().subscribe(result => {
      this.wishlists = result;
    })
  }

  getWishlists(){
    return this.http.get<Product[]>(environment.apiUrl + '/customer/wishlist')
  }

  addInWishlists(productId: string){
    return this.http.post(environment.apiUrl + '/customer/wishlist/'+ productId,
      {}
    )
  }

  removeInWishlists(productId: string){
    return this.http.delete(environment.apiUrl + '/customer/wishlist/' + productId)
  }
}
