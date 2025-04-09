import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../types/order';
import { CommonModule, DatePipe } from '@angular/common';
import { Product } from '../../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-orders',
  imports: [DatePipe, CommonModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private cdr = inject(ChangeDetectorRef);
  orderService = inject(OrderService);
  orders: Order[] = [];
  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit() {
    this.orderService.getAdminOrder().subscribe((result) => {
      this.orders = result;
      this.cdr.detectChanges();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  get paginatedOrders(): Order[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.orders.slice(start, start + this.itemsPerPage);
  }

  sellingPrice(product: Product): number {
    if (!product?.price) return 0; // Use 'product' instead of 'this.product'
    const price = Number(product.price);
    const discount = Number(product.discount) || 0;
    return Math.round(price - (price * discount) / 100);
  }
  statusChanged(button: any, order: Order) {
    console.log(button.value);
    this.orderService
      .updateOrderStatus(order._id!, button.value)
      .subscribe((result) => {
        alert('Order Status Updated');
      });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
