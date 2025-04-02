import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { CardItem } from '../types/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  items: CardItem[] = [];

  constructor() {}
  init() {
    this.getCartItems().subscribe((result) => {
      this.items = result; // Update the BehaviorSubject with the initial data
    });
  }

  getCartItems() {
    return this.http.get<CardItem[]>(environment.apiUrl + '/customer/carts');
  }

  addToCart(productId: string, quantity: number) {
    return this.http.post(environment.apiUrl + '/customer/carts/' + productId, {
      quantity: quantity,
    });
  }

  removeFromCart(productId: string) {
    return this.http.delete(
      environment.apiUrl + '/customer/carts/' + productId
    );
  }
}
