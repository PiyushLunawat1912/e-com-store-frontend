import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  imports: [ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage!: string;
  similarProducts: Product[] = [];

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
}
