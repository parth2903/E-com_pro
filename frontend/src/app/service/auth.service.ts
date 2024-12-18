import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  constructor() { }

  registerUser(name: String, email: String, password: String){
    return this.http.post(environment.apiUrl+"/auth/register", {
      name,
      email,
      password
    })
  }

  loginUser(email: String, password: String){
    return this.http.post(environment.apiUrl+"/auth/login", {
      email,
      password
    })
  }

  get isUserLoggedIn(){
    let token = localStorage.getItem("token");
    if(token){
      return true;

    }
    return false;
  }

  get isAdminTrue(){
    let userData = localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).isAdmin;  

    }
    return null;
  }


  get userName(){
    let userData = localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).name;  

    }
    return null;
  }

  get userEmail(){
    let userData = localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).email;  

    }
    return null;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user')
  }
}
