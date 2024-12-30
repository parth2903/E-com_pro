import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.module';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product ?: Product;
  productCat ?: Category;
  mainImage !: string;
  similarProducts:Product[] = []
  
  route = inject(ActivatedRoute)
  constructor(private customerService: CustomerService){}

  ngOnInit(): void {
    this.route.params.subscribe((x: any) => {
      this.getProductDetail(x.id)
    });
      
  }

  getProductDetail(id: string){
    this.customerService.getPoductById(id).subscribe(result => {
      this.product = result;
      this.mainImage = this.product.images[0]

      this.customerService.getProducts('', this.product.categoryId,1,4,'',1,'').subscribe(res => {
        this.similarProducts = res;
      })

      if (this.product?.categoryId) {
        const catId = this.product.categoryId;
        this.customerService.getCategorieById(catId).subscribe((res) => {
            this.productCat = res;              
        });
      }
    })
  }

  changeImage(image : string){
    this.mainImage = image
  }

  get sellingPrice(): number{
    const price = Number(this.product?.price) || 0; 
    const discount = Number(this.product?.discount) || 0; 
    return price - (price * discount) / 100;
  }
}
