import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'webapp';
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  wishlist: any[] = [];

  ngOnInit() {
    this.loadWishlist();
    this.cartService.init();
  }
  loadWishlist() {
    this.wishlistService.getWishlists().subscribe((items) => {
      this.wishlist = items;
    });
  }
}
