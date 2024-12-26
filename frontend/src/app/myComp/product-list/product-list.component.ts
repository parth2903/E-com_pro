import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Product } from '../../models/product.module';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../models/category.model';
import { Brand } from '../../models/brand.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatSelectModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  searchCat: string = "";
  categoryId:string = "";
  sortBy: string = ""; 
  sortOrder: number = -1; 
  brandId: string = "";
  products: Product[] = [];
  page: number = 1;
  pageSize: number = 6;
  route = inject(ActivatedRoute)
  categoryList: Category[] = []
  brandList: Brand[] = []

  constructor(private customerService: CustomerService){}

  ngOnInit(): void {
    this.customerService.getCategories().subscribe(result => {
      this.categoryList = result;
    })

    this.customerService.getBrands().subscribe(result => {
      this.brandList = result;
    })


    this.route.queryParamMap.subscribe((x: any) => {
      this.searchCat = x.get('search') || "";
      this.categoryId = x.get('categoryId')  || "";
      
      this.getProducts();
    })
  }

  getProducts(){
    setTimeout(() => {
      this.customerService.getProducts(
        this.searchCat,
        this.categoryId,
        this.page,
        this.pageSize,
        this.sortBy,
        this.sortOrder,
        this.brandId
      ).subscribe(result => {
        this.products = result;
      })
    },500)
  }

  orderChange(event: any){
    this.sortBy='price';
    this.sortOrder=event;
    this.getProducts();
  }

  changePage(page: number){
    this.page=page;
    this.getProducts()
  }
}
