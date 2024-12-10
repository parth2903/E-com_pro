import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../models/brand.module';
import { BrandService } from '../../../service/brand.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, RouterLink,CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BrandsComponent implements OnInit{
  [x: string]: any;
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Brand>;

  constructor(private brandService : BrandService){}

  ngOnInit(): void {
    this.getServerData();
  }

  private getServerData() {
    this.brandService.getBrands().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id:String){
    this.brandService.deleteBrandById(id).subscribe((result:any) => {
      alert("Brand Deleted");
      this.getServerData();
    })
  }

}
