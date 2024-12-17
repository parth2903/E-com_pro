import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  router = inject(Router)
  constructor(
    public fb: FormBuilder,
    private authService: AuthService
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(){
    this.authService.loginUser(this.loginForm.value.email!, this.loginForm.value.password!).subscribe((result: any) =>{
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user ))
      this.router.navigateByUrl("/")
    })
  }
}
