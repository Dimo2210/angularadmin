import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { firstValueFrom } from 'rxjs';
import {ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any;
  constructor(private HttpService: HttpService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.fetchCategories();
  }
  fetchCategories() {
    this.HttpService.getCategories().subscribe(
      response => {
        console.log('Categories:', response);
        this.categories = response; 
        
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  goto_category_by_group(id: any) 
  {
    console.log(id)
    var data = 
    {
      "ID": id,
    };
    this.router.navigate(['/editcategory',{id:id}]);
    console.log(data);
  }

  // async deleteCategory(id: number): Promise<void> {
  //   try {
      
  //     await this.HttpService.deleteCategory(id).toPromise();
  //     console.log(`Category with ID ${id} deleted successfully.`);
  //     this.fetchCategories();
      
  //   } catch (error) {
  //     console.error('Error deleting category:', error);
      
  //   }
  // }

  async deleteCategory(id: number): Promise<void> {
    const isConfirmed = await this.showConfirmation();
  
    if (isConfirmed) {
      try {
        // Your delete logic here
        await this.HttpService.deleteCategory(id).toPromise();
        console.log(`Category with ID ${id} deleted successfully.`);
        this.fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  }

  
  // async fetchCategories(): Promise<void> {
  //   try {
  //     console.log("test");
  //     const response: any = await firstValueFrom(this.HttpService.getCategories());
  //     if (response.data.status === 'Success') {
  //       this.categories = response.data.data;
  //     } else {
  //       console.error('Error fetching categories:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // }
  


  // fetchCategories() {
  //   this.HttpService.getCategories().subscribe(
  //     (response: any) => {
  //       console.log('Categories:', response);
  //       if (Array.isArray(response) && response.length > 0 && response[0].status === 'Success') {
  //         this.categories = response[0].data;
  //         // Do something with the categories if needed
  //       } else {
  //         // Handle the case where status is not 'Success' or response structure is unexpected
  //         console.error('Error fetching categories:', response);
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error fetching categories:', error);
  //       // Handle the error here
  //     }
  //   );
  // }
  
  
  
  
// async fetchCategories(): Promise<void> {
//   console.log("test");

//   this.HttpService.getCategories().subscribe(
//     (response: any) => {
//       if (response && response.data && response.data.status === 'Success') {
//         this.categories = response.data.data;
//       } else {
//         console.error("Invalid response format:", response);
//       }
//     },
//     (error: any) => {
//       console.error("Error fetching categories:", error);
//     }
//   );
// }
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
