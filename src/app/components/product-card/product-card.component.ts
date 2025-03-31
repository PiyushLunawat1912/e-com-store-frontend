import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  wishlistService = inject(WishlistService);

  get sellingPrice(): number {
    if (!this.product?.price) return 0; // Prevent errors if product is undefined

    const price = Number(this.product.price); // Ensure price is a number
    const discount = Number(this.product.discount) || 0; // Ensure discount is a number (default to 0)

    return Math.round(price - (price * discount) / 100);
  }

  addToWishlist(product: Product) {
    console.log(product);
    // if (this.isInWishlist(product)) {
    //   this.wishlistService
    //     .removeFormWishlist(product._id!)
    //     .subscribe((result) => {
    //       this.wishlistService.init();
    //     });
    // } else {
    //   this.wishlistService.addInWishlist(product._id!).subscribe((result) => {
    //     this.wishlistService.init();
    //   });
    // }
  }

  isInWishlist(product: Product) {
    let isExits = this.wishlistService.wishlists.find(
      (x) => x._id == product._id
    );
    if (isExits) return true;
    else return false;
  }
}
