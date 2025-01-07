import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { Product } from '../../models/product.module';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductCardComponent {
  @Input() product!: Product;
  cartService = inject(CartService)

  get sellingPrice(): number{
    const price = Number(this.product.price) || 0; 
    const discount = Number(this.product.discount) || 0; 
    return price - (price * discount) / 100;
  }

  addToCart(product: any){
    if(!this.isInCart(product._id)){
      this.cartService.addToCart(product._id, 1).subscribe(()=>{
        this.cartService.init()
      });
    }else{
      this.cartService.removeFromCart(product._id).subscribe(()=>{
        this.cartService.init()
      });
    }
  }

  isInCart(productId: string | undefined){
    if(this.cartService.cart.find(x=> x.product._id == productId)){
      return true
    }else{
      return false
    }
  }
}
