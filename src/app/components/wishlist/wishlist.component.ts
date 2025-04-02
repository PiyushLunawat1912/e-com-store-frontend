import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  imports: [CommonModule, ProductCardComponent],
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];
  loadWishlist: any;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.wishlists$.subscribe((wishlist) => {
      this.wishlist = wishlist; // Subscribe to the wishlist observable
      this.loadWishlist();
    });
  }

  // Add or remove product from wishlist
  addProductToWishlist(productId: string) {
    this.wishlistService.addInWishlist(productId).subscribe(() => {
      this.loadWishlist();
    });
  }

  removeProductFromWishlist(productId: string) {
    this.wishlistService.removeFormWishlist(productId).subscribe(() => {
      this.loadWishlist();
    });
  }

  trackByFn(index: number, item: Product): string {
    if (item && item._id) {
      return item._id;
    } else {
      return ''; // or any fallback value
    }
  }
  toggleDarkMode() {
    document.body.classList.toggle('dark');
  }
}
