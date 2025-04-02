import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [ProductCardComponent, MatIconModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage!: string;
  similarProducts: Product[] = [];
  wishlistService = inject(WishlistService);
  wishlist: string[] = [];

  ngOnInit() {
    this.route.params.subscribe((x: any) => {
      this.getProductDetail(x.id);
    });
  }

  getProductDetail(id: string) {
    this.customerService.getProductById(id).subscribe((result) => {
      this.product = result;
      this.mainImage = this.product.images[0];
      console.log(this.product);

      this.customerService
        .getProducts('', this.product.categoryId.toString(), '', '', -1, 1, 4)
        .subscribe((result) => {
          this.similarProducts = result;
        });
    });
  }
  changeImage(url: string) {
    this.mainImage = url;
  }

  get sellingPrice(): number {
    if (!this.product?.price) return 0; // Prevent errors if product is undefined

    const price = Number(this.product.price); // Ensure price is a number
    const discount = Number(this.product.discount) || 0; // Ensure discount is a number (default to 0)

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

  toggleDarkMode() {
    document.body.classList.toggle('dark');
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
