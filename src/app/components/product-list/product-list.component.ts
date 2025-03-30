import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  customerService = inject(CustomerService);
  productService = inject(ProductService);
  searchTerm: string = '';
  categoryId: string = '';
  brandId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  page = 1;
  pageSize = 6;
  products: Product[] = [];
  route = inject(ActivatedRoute);
  category: Category[] = [];
  brands: Brand[] = [];
  ngOnInit() {
    this.customerService.getCategories().subscribe((result) => {
      this.category = result;
    });
    this.customerService.getBrands().subscribe((result) => {
      this.brands = result;
    });
    this.route.queryParams.subscribe((x: any) => {
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryId || '';

      this.getProducts();
    });
  }

  getProducts() {
    setTimeout(() => {
      this.customerService
        .getProducts(
          this.searchTerm,
          this.categoryId,
          this.brandId,
          this.sortBy,
          this.sortOrder,
          this.page,
          this.pageSize
        )
        .subscribe((result) => {
          this.products = result;
          if (result.length < this.pageSize) {
            this.isNext = false;
          }
        });
    }, 200);
  }
  orderChange(event: any) {
    this.sortBy = 'price';
    this.sortOrder = event;
    console.log('🔄 Sorting changed:', {
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
    });

    this.fetchProducts();
  }
  fetchProducts() {
    console.log('🛠 Fetching products with', {
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
    });

    this.productService
      .getAllProducts(this.sortBy, this.sortOrder)
      .subscribe((products) => {
        this.products = products;
        console.log(
          '✅ Sorted Products:',
          this.products.map((p) => p.price)
        ); // Log only prices
      });
  }
  isNext = true;
  pageChange(page: number) {
    this.page = page;
    this.isNext = true;
    this.getProducts();
  }
}
