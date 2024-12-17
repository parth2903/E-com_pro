import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  router = inject(Router)
  constructor(
    public fb: FormBuilder,
    private authService: AuthService
  ){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  register(){
    let value = this.registerForm.value;
    this.authService.registerUser(value.name!, value.email!, value.password!).subscribe(result => {
      alert("User registered");
      this.router.navigateByUrl("/login")
    })
  }
}
