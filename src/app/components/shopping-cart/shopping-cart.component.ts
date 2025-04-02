import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  @Input() product!: Product;
  cartService = inject(CartService);

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
}
