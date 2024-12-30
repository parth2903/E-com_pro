import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  get sellingPrice(): number{
    const price = Number(this.product.price) || 0; 
    const discount = Number(this.product.discount) || 0; 
    return price - (price * discount) / 100;
  }
}
