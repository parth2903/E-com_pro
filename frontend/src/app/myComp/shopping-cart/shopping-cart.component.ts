import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { OrderService } from '../../service/order.service';
import { Order } from '../../models/order.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ShoppingCartComponent implements OnInit{
  cartService = inject(CartService)
  orderService = inject(OrderService)
  router=inject(Router)
  orderStep: number = 0
  paymentType = 'cash'

  addressForm!: FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      addressLine1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
    this.cartService.init()
  }

    get cartItems(){
    return this.cartService.cart
  }

  sellingPrice(product: Product): number{
    const price = Number(product.price) || 0; 
    const discount = Number(product.discount) || 0; 
    return price - (price * discount) / 100;
  }

  addToCart(productId: string, quantity: number){
    this.cartService.addToCart(productId,quantity).subscribe(()=>{
      this.cartService.init()
    })
  }

  removeItemFromCart(productId: string){
    this.cartService.removeFromCart(productId).subscribe(()=>{
      this.cartService.init()
    })
  }

  get totalAmount(){
    let amount = 0
    for(let i=0; i < this.cartItems.length; i++){
      const ele = this.cartItems[i]
      amount+= (this.sellingPrice(ele.product)*ele.quantity)
    }
    return amount
  }

  checkout(){
    this.orderStep = 1;
  }

  addAddress() {
    if (this.addressForm.valid) {
      this.orderStep = 2;
      console.log('Address Submitted:', this.addressForm.value);
      // Handle the form submission logic here
    } else {
      console.log('Form is invalid');
    }
  }

  completeOrder(){
    let order : Order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address :this.addressForm.value,
      date: new Date(),
    }
    this.orderService.addOrder(order).subscribe((result) => {
      alert('Your order is completed')
      this.cartService.init()
      this.orderStep = 0
      this.router.navigateByUrl("/orders")
    })
    console.log(order)
  }
}
