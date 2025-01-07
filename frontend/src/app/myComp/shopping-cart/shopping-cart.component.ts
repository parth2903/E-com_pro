import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.module';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit{
  cartService = inject(CartService)
  ngOnInit(): void {
      this.cartService.init()
  }
  get cartItems(){
    return this.cartService.cart
  }

  sellingPrice(product: Product): number{
    const price = Number(product.price) || 0; 
    const discount = Number(product.discount) || 0; 
    return price - (price * discount) / 100;
  }

  addToCart(productId: string, quantity: number){
    this.cartService.addToCart(productId,quantity).subscribe(()=>{
      this.cartService.init()
    })
  }

  removeItemFromCart(productId: string){
    this.cartService.removeFromCart(productId).subscribe(()=>{
      this.cartService.init()
    })
  }

  get totalAmount(){
    let amount = 0
    for(let i=0; i < this.cartItems.length; i++){
      const ele = this.cartItems[i]
      amount+= (this.sellingPrice(ele.product)*ele.quantity)
    }
    return amount
  }
}
