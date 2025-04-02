import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private _wishlists = new BehaviorSubject<Product[]>([]); // BehaviorSubject for wishlist
  wishlists$ = this._wishlists.asObservable(); // Observable to subscribe in components

  constructor(private http: HttpClient) {
    this.init(); // Initialize wishlist on service creation
  }

  // Initialize wishlist by fetching from API
  init() {
    this.getWishlists().subscribe((result) => {
      this._wishlists.next(result); // Update the BehaviorSubject with the initial data
    });
  }

  // Get the wishlist from the API
  getWishlists() {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/Wishlist');
  }

  // Add product to wishlist and update local wishlist state
  addInWishlist(productId: string) {
    return this.http
      .post(environment.apiUrl + '/customer/Wishlist/' + productId, {})
      .pipe(
        // After adding product, re-fetch the wishlist and update the state
        switchMap(() => this.getWishlists()), // Switch to the result of getWishlists
        tap((result) => this._wishlists.next(result)) // Update the BehaviorSubject
      );
  }

  // Remove product from wishlist and update local wishlist state
  removeFormWishlist(productId: string) {
    return this.http
      .delete(environment.apiUrl + '/customer/Wishlist/' + productId)
      .pipe(
        // After removing product, re-fetch the wishlist and update the state
        switchMap(() => this.getWishlists()), // Switch to the result of getWishlists
        tap((result) => this._wishlists.next(result)) // Update the BehaviorSubject
      );
  }
}
