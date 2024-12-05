import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit{
  name: String ="";
  router = inject(Router);
  route=inject(ActivatedRoute);
  isEdit: boolean = false;
  id!: String;
  constructor(private categoryService: CategoryService){

  }

  ngOnInit(): void {
      this.id = this.route.snapshot.params["id"]
      if(this.id){
        this.isEdit=true
        this.categoryService.getCategoryById(this.id).subscribe((result: any)=> {
          this.name = result.name
        })
      }
  }

  add(){
    console.log(this.name);
    this.categoryService.addCategory(this.name).subscribe((result: any)=>{
      alert("Category added");
      this.router.navigateByUrl("/admin/categories")
    })
    
  }

  update(){
    this.categoryService.updateCategory(this.id, this.name).subscribe((result: any)=>{
      alert("Category updated");
      this.router.navigateByUrl("/admin/categories")
    })
  }
}
