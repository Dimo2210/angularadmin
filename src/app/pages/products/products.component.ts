import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any;

  constructor(
    private HttpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    
    this.fetchProducts();
  }
  fetchProducts() {
    this.HttpService.getProducts().subscribe(
      response => {
        console.log('Products:', response);
        this.products = response; 
        
      },
      error => {
        console.error('Error fetching Products:', error);
      }
    );
  }
  goto_products_by_group(id: any) 
  {
    console.log(id)
    var data = 
    {
      "ID": id,
    };
    this.router.navigate(['/addproducts',{id:id}]);
    console.log(data);
  }

  async deleteProduct(id: number): Promise<void> {
    const isConfirmed = await this.showConfirmation();
  
    if (isConfirmed) {
      try {
        await this.HttpService.deleteProduct(id).toPromise();
        console.log(`Product with ID ${id} deleted successfully.`);
        this.fetchProducts();
      } catch (error) {
        console.error('Error deleting Product:', error);
      }
    }
  }

  async showConfirmation(): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    return result.isConfirmed;
  }
}
