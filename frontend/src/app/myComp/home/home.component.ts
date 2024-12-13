import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Product } from '../../models/product.module';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  newProducts: Product[]=[];
  featuredProducts: Product[]=[];
  constructor(private customerService: CustomerService){}

  ngOnInit(): void {
      this.customerService.getFeaturedProducts().subscribe((result) =>{
        this.featuredProducts = result;
      })

      this.customerService.getNewProducts().subscribe((result) =>{
        this.newProducts = result;
      })
  }

}
