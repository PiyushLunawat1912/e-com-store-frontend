import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  @Input() product!: Product;
  cartService = inject(CartService);
  wishlist: any[] = [];

  ngOnInit() {
    this.cartService.init();
  }
  get cartItems() {
    return this.cartService.items;
  }
  sellingPrice(product: Product): number {
    if (!product?.price) return 0; // Use 'product' instead of 'this.product'
    const price = Number(product.price);
    const discount = Number(product.discount) || 0;
    return Math.round(price - (price * discount) / 100);
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe((result) => {
      this.cartService.init();
    });
  }

  removeFromCart(product: Product) {
    if (!product._id) {
      console.error('Product ID is missing');
      return;
    }

    this.cartService.removeFromCart(product._id).subscribe(
      () => {
        console.log(`Removed product ${product._id} from cart`);
        this.cartService.init(); // Reload cart after removing item
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }
  get totalAmount() {
    let amount = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      amount += this.sellingPrice(element.product) * element.quantity;
    }
    return amount;
  }

  orderStep: number = 0;
  formbuilder = inject(FormBuilder);
  paymentType = 'cash';
  addressForm = this.formbuilder.group({
    fullName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', [Validators.required, Validators.minLength(5)]],
    country: ['', Validators.required],
  });

  checkout() {
    this.orderStep = 1;
  }
  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Address Saved:', this.addressForm.value);
      alert('Address saved successfully!');
      this.addressForm.reset();
    }
  }
  addAddress() {
    this.orderStep = 2;
  }

  orderService = inject(OrderService);
  router = inject(Router);
  completeOrder() {
    let order: Order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
      totalAmount: this.totalAmount,
    };

    this.orderService.addOrder(order).subscribe((result) => {
      alert('Your Order Is Completed');
      this.cartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl('/orders');
    });
    console.log(order);
  }
}
