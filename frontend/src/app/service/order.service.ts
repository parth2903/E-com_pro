import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order.module';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)
  constructor() { }

  addOrder(order: Order){
    return this.http.post(environment.apiUrl + "/customer/order", order)
  }

  getCutomerOrders(){
    return this.http.get<Order[]>(environment.apiUrl + "/customer/orders")
  }
}
