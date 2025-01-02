import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../service/wishlist.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.module';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.scss'
})
export class WishlistsComponent implements OnInit{
  wishlists: Product[] = []
  constructor(public wishlistService :WishlistService){}

  ngOnInit(): void {
      this.wishlistService.init()
  }
}
