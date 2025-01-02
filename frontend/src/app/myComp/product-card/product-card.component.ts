import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Product } from '../../models/product.module';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';

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

  get sellingPrice(): number{
    const price = Number(this.product.price) || 0; 
    const discount = Number(this.product.discount) || 0; 
    return price - (price * discount) / 100;
  }
}
