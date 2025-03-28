import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, MatSelectModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  customerService = inject(CustomerService);
  searchTerm: string = '';
  categoryId: string = '';
  brandId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  page = 1;
  pageSize = 10;
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
      this.brandId = x.brandId || '';

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
        });
    }, 100);
  }
  // orderChange(event: any) {
  //   this.sortBy = 'price';
  //   this.sortOrder = event;
  //   this.getProducts();
  // }
}
