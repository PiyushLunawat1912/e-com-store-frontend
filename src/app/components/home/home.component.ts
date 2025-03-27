import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   customerService = inject(CustomerService);
   newProducts: Product[]=[];
   featuredProducts: Product[]=[];

   ngOnInit(){
    this.customerService.getFeaturedProducts().subscribe(result=>{
      this.featuredProducts = result;
      console.log(this.featuredProducts);
      
    });

    this.customerService.getNewProducts().subscribe(result=>{
      this.newProducts = result;
      console.log(this.newProducts);
    });


   }
}
