import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../service/brand.service';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent implements OnInit {
  name: String ="";
  router = inject(Router);
  route=inject(ActivatedRoute);
  isEdit: boolean = false;
  id!: String;
  constructor(private brandService: BrandService){

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    if(this.id){
      this.isEdit=true
      this.brandService.getBrandById(this.id).subscribe((result: any)=> {
        this.name = result.name
      })
    }
  }

  add(){
    console.log(this.name);
    this.brandService.addBrand(this.name).subscribe((result: any)=>{
      alert("Brand added");
      this.router.navigateByUrl("/admin/brands")
    })
    
  }

  update(){
    this.brandService.updateBrand(this.id, this.name).subscribe((result: any)=>{
      alert("Brand updated");
      this.router.navigateByUrl("/admin/brands")
    })
  }

}
