import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryService } from '../../../service/category.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Category } from '../../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, RouterLink,CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit{
  [x: string]: any;
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Category>;


  constructor(private categoryService : CategoryService){
    
  }

  ngOnInit(): void {
    this.getServerData();
  }

  private getServerData() {
    this.categoryService.getCategories().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id:String){
    this.categoryService.deleteCategoryById(id).subscribe((result:any) => {
      alert("Category Deleted");
      this.getServerData();
    })
  }
}
