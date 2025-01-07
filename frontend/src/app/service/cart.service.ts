import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.module';
import { CartItem } from '../models/cartItem.module';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient)
  cart: CartItem[] = []
  constructor() { }

  init(){
    return this.getCartItems().subscribe(result => {
      this.cart = result;
    })
  }

  getCartItems(){
    return this.http.get<CartItem[]>(
      environment.apiUrl+ '/customer/carts'
    );
  }

  addToCart(productId: string, quantity: number){
    return this.http.post(
      environment.apiUrl+ '/customer/carts/'+ productId, {
        quantity
      }
    );
  }

  removeFromCart(productId: string){
    return this.http.delete(
      environment.apiUrl+ '/customer/carts/'+ productId
    );
  }
}
