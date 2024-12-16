import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  categoryList : Category[] = []
  constructor(private categoryService: CategoryService, private router: Router){}

  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(result => {
        this.categoryList = result;
      })
  }

  onSearch(e: any){
    if(e.target.value){
      this.router.navigateByUrl("/products?search="+e.target.value)
    }
    
  }

  onCategoryClick(id: String){
    this.router.navigateByUrl("/products?categoryId="+id)
  }
}
