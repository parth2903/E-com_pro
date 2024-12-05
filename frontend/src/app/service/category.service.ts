import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http=inject(HttpClient)
  constructor() { }

  getCategories(){
    return this.http.get<Category[]>("http://localhost:3000/category");
  }

  getCategoryById(id: String){
    return this.http.get<Category>("http://localhost:3000/category/"+id);
  }

  addCategory(name: String){
    return this.http.post("http://localhost:3000/category", {
      name: name,
    })
  }

  updateCategory(id: String, name: String){
    return this.http.put('http://localhost:3000/category/' +id, {
      name: name,
    })
  }

  deleteCategoryById(id: String){
    return this.http.delete("http://localhost:3000/category/"+id);
  }
}
