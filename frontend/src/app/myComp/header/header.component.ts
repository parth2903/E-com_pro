import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CustomerService } from '../../service/customer.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  categoryList : Category[] = []
  searchCat !: String;
  constructor(private customerService: CustomerService, 
    private router: Router,
    public authService: AuthService
  ){}

  ngOnInit(): void {
      this.customerService.getCategories().subscribe(result => {
        this.categoryList = result;
      })
  }

  onSearch(e: any){
    this.searchCat = ""
    if(e.target.value){
      this.router.navigateByUrl("/products?search="+e.target.value)
    }
    
  }

  onCategoryClick(id: String){
    this.router.navigateByUrl("/products?categoryId="+id)
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
