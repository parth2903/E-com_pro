import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../models/order.module';
import { OrderService } from '../../service/order.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Product } from '../../models/product.module';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.scss'
})
export class MyOrderComponent implements OnInit{
  orders: Order[] = []
  orderService = inject(OrderService)

  ngOnInit(): void {
      this.orderService.getCutomerOrders().subscribe((result) => {
        this.orders = result
        console.log(this.orders);
        
      })
  }

  sellingPrice(product: Product): number{
    const price = Number(product.price) || 0; 
    const discount = Number(product.discount) || 0; 
    return price - (price * discount) / 100;
  }

  
}
