import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent,
        
    },

    // Routes for Categories
    {
        path:'admin/categories',
        component:CategoriesComponent
    },
    {
        path:'admin/categories/add',
        component:CategoryFormComponent
    },

    {
        path:'admin/categories/:id',
        component:CategoryFormComponent
    },
    

   // Routes for Brands
    {
        path:'admin/brands',
        component:BrandsComponent 
    },
    {
        path:'admin/brands/add',
        component:BrandFormComponent
    },

    {
        path:'admin/brands/:id',
        component:BrandFormComponent
    },

 // Routes for Product

 {
    path:'admin/products',
    component:ProductsComponent 
},
{
    path:'admin/products/add',
    component:ProductFormComponent
},

{
    path:'admin/products/:id',
    component:ProductFormComponent
},

{
    path:'product',
    component:ProductListComponent
},
{
    path:'product/:id',
    component:ProductDetailComponent
},

];


