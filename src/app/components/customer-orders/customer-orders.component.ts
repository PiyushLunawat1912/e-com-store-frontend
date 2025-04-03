import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../types/product';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  imports: [DatePipe, CommonModule],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css',
})
export class CustomerOrdersComponent {
  orders: Order[] = [];
  orderService = inject(OrderService);

  ngOnInit() {
    this.orderService.getCustomerOrders().subscribe((result) => {
      this.orders = result;
      console.log(this.orders);
    });
  }

  sellingPrice(product: Product): number {
    if (!product?.price) return 0; // Use 'product' instead of 'this.product'
    const price = Number(product.price);
    const discount = Number(product.discount) || 0;
    return Math.round(price - (price * discount) / 100);
  }
}
