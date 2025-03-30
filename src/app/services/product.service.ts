import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  constructor() {}

  getAllProducts(sortBy = 'price', sortOrder = 1) {
    console.log('📢 API Call: Fetching products with', { sortBy, sortOrder });

    return this.http.get<Product[]>(environment.apiUrl + '/product', {
      params: { sortBy, sortOrder: sortOrder.toString() }, // Ensure correct params
    });
  }
  getProductById(id: string) {
    return this.http.get<Product>(environment.apiUrl + '/product/' + id);
  }

  addProduct(model: Product) {
    return this.http.post(environment.apiUrl + '/product', model);
  }

  updateProduct(id: string, model: Product) {
    return this.http.put(environment.apiUrl + '/product/' + id, model);
  }

  deleteProduct(id: string) {
    return this.http.delete(environment.apiUrl + '/product/' + id);
  }
}
