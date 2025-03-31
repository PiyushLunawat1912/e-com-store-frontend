import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { resourceUsage } from 'process';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor() {}
  http = inject(HttpClient);
  wishlists: Product[] = [];
  init() {
    this.getWishlists().subscribe((result) => {
      this.wishlists = result;
    });
  }
  getWishlists() {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/Wishlist');
  }

  addInWishlist(productId: string) {
    return this.http.post(
      environment.apiUrl + '/customer/Wishlist/' + productId,
      {}
    );
  }

  removeFormWishlist(productId: string) {
    return this.http.delete(
      environment.apiUrl + '/customer/Wishlist/' + productId
    );
  }
}
