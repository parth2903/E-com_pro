import { CartItem } from "./cartItem.module"

export interface Order{
  items: CartItem[],
  paymentType: string,
  address :any,
  date: Date,
  status?: number
}