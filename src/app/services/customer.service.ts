import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { Category } from '../types/category';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  http = inject(HttpClient);

  constructor() {}

  getNewProducts() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/new-products'
    );
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/featured-products'
    );
  }

  getCategories() {
    return this.http.get<Category[]>(
      environment.apiUrl + '/customer/categories'
    );
  }

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + '/customer/brands');
  }

  getProducts(
    searchTerm: string,
    categoryId: string,
    brandId: string,
    sortBy: string,
    sortOrder: number,
    page: number,
    pageSize: number
  ) {
    const params: any = {};

    if (searchTerm) params.searchTerm = searchTerm;
    if (categoryId) params.categoryId = categoryId; // ✅ Ensure categoryId is included
    if (brandId) params.brandId = brandId;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;
    if (page) params.page = page;
    if (pageSize) params.pageSize = pageSize;

    return this.http.get<Product[]>(
      environment.apiUrl +
        `/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&brandId=${brandId}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`
    );
  }
}
