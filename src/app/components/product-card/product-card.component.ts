import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  wishlistService = inject(WishlistService);
  wishlist: string[] = [];

  ngOnInit() {
    this.loadWishlist();
  }

  get sellingPrice(): number {
    if (!this.product?.price) return 0;
    const price = Number(this.product.price);
    const discount = Number(this.product.discount) || 0;
    return Math.round(price - (price * discount) / 100);
  }

  loadWishlist() {
    this.wishlistService.getWishlists().subscribe((items) => {
      this.wishlist = items
        .filter((item: any) => item && item._id)
        .map((item: any) => item._id);
    });
  }

  isInWishlist(product: Product): boolean {
    return this.wishlist.includes(product._id ?? '');
  }

  toggleWishlist(product: Product) {
    const productId = product._id ?? '';
    if (!productId) return;

    if (this.isInWishlist(product)) {
      this.wishlistService.removeFormWishlist(productId).subscribe(() => {
        this.loadWishlist();
      });
    } else {
      this.wishlistService.addInWishlist(productId).subscribe(() => {
        this.loadWishlist();
      });
    }
  }
  cartService = inject(CartService);
  addToCart(product: Product) {
    console.log(product);
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        this.cartService.init();
      });
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(() => {
        this.cartService.init();
      });
    }
  }

  isProductInCart(productId: string) {
    if (this.cartService.items.find((x) => x.product._id == productId)) {
      return true;
    } else {
      return false;
    }
  }
}
