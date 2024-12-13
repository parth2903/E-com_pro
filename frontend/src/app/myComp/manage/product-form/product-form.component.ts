import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../models/brand.module';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../service/category.service';
import { BrandService } from '../../../service/brand.service';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit{
  productForm !: FormGroup;
  brands: Brand[]= []
  categories: Category[]=[]
  id!: String;
  route = inject(ActivatedRoute);
  router = inject(Router)

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private brandService: BrandService, private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]], 
      shortDescription: ['', [Validators.required, Validators.minLength(10)]],    
      description: [null, [Validators.required, Validators.min(50)]], 
      price: [null, [Validators.required]],
      discount: [null],
      images: this.fb.array([]),
      categoryId: [null, [Validators.required]],
      brandId: [null, [Validators.required]],  
      isFeatured: [false],
      inNew: [false]   
    });
    

    this.categoryService.getCategories().subscribe((result) =>{
      this.categories=result;
    })

    this.brandService.getBrands().subscribe((result) =>{
      this.brands = result;
    })

    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.productService.getProductById(this.id).subscribe(result => {
        for(let index=0; index < result.images.length; index++){
          this.addImage();
        }
        this.productForm.patchValue(result as any);
      })
    }else{
      this.addImage();
    }
  }

  get images(){
    return this.productForm.get('images') as FormArray; 
  }
  
  addProduct(){
    let value = this.productForm.value;
    this.productService.addProduct(value as any).subscribe((result) => {
      alert("Product added")
      this.router.navigateByUrl("/admin/products")
    })
  }


  addImage() {
    this.images.push(this.fb.control(null));
  }

  removeImage(){
    this.images.removeAt(this.images.controls.length-1);
  }

  updateProduct(){
    let value = this.productForm.value;
    this.productService.updateProduct(this.id,value as any).subscribe((result) => {
      alert("Product updated")  
      this.router.navigateByUrl("/admin/products")
    })
  }
}