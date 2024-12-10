import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../models/brand.module';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http=inject(HttpClient);
  constructor() { }

  getBrands(){
    return this.http.get<Brand[]>(environment.apiUrl+"/brand");
  }

  getBrandById(id: String){
    return this.http.get<Brand>(environment.apiUrl+"/brand/"+id);
  }

  addBrand(name: String){
    return this.http.post(environment.apiUrl+"/brand", {
      name: name,
    })
  }

  updateBrand(id: String, name: String){
    return this.http.put(environment.apiUrl+'/brand/' +id, {
      name: name,
    })
  }

  deleteBrandById(id: String){
    return this.http.delete(environment.apiUrl+"/brand/"+id);
  }
}
