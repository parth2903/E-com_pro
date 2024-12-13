import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  categoryList : Category[] = []
  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(result => {
        this.categoryList = result;
      })
  }
}
