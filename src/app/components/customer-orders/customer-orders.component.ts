import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../types/product';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer-orders',
  imports: [DatePipe, CommonModule, MatIconModule],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css',
})
export class CustomerOrdersComponent {
  private cdr = inject(ChangeDetectorRef);
  orders: Order[] = [];
  orderService = inject(OrderService);
  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit() {
    this.orderService.getCustomerOrders().subscribe((result) => {
      this.orders = result;
      console.log(this.orders);
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

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
