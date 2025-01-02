import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Product } from '../../models/product.module';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../service/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit{
  newProducts: Product[]=[];
  featuredProducts: Product[]=[];
  bannerImg: Product[]=[];
  constructor(private customerService: CustomerService,
    private wishlistService: WishlistService
  ){}

  ngOnInit(): void {
    this.customerService.getFeaturedProducts().subscribe((result) =>{
      this.featuredProducts = result;
      this.bannerImg.push(...result);
    })

    this.customerService.getNewProducts().subscribe((result) =>{
      this.newProducts = result;
      this.bannerImg.push(...result);
    })

    this.wishlistService.init()
  }

}
