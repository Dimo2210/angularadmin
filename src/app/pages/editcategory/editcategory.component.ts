import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {
  categoryForm: FormGroup;
  selectedFileName: string;
  FileName: any;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });

    this.bindCategoryDetails();
  }

  // async bindCategoryDetails() {
  //   const categoryId = this.route.snapshot.paramMap.get('id');
  //   if (categoryId) {
  //     try {
  //       const response = await this.httpService.getbyidcategory(+categoryId).toPromise();
  //       console.log('Category:', response);
  //       if (response) {
  //         const categoryData = response;
  //         this.categoryForm.patchValue({
  //           id: categoryData.id,
  //           categoryName: categoryData.name,
  //           description: categoryData.description,
  //           image: categoryData.image
  //         });
  //         console.log('Image Value:', categoryData.image);
  //         console.log(' Value:', categoryData.categoryName);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching category by ID:', error);
  //     }
  //   }
  // }
  async bindCategoryDetails() {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
        try {
            const response = await this.httpService.getbyidcategory(+categoryId).toPromise();
            console.log('Category:', response);
            if (response) {
                const categoryData = response;
                this.categoryForm.patchValue({
                    id: categoryData.id,
                    categoryName: categoryData.name || '', // Handle undefined case
                    description: categoryData.description,
                    image:categoryData.image,
                    // Don't set the 'image' field here
                });
                this.FileName = categoryData.image,
                console.log('Image Value:', categoryData.image);
                
                // console.log('Image Value:', categoryData.image.name[0]);
            }
        } catch (error) {
            console.error('Error fetching category by ID:', error);
        }
    }
}

//   async bindCategoryDetails() {
//     const categoryId = this.route.snapshot.paramMap.get('id');
//     if (categoryId) {
//         try {
//             const response = await this.httpService.getbyidcategory(+categoryId).toPromise();
//             console.log('Category:', response);
//             if (response) {
//                 const categoryData = response;
//                 this.categoryForm.patchValue({
//                     id: categoryData.id,
//                     categoryName: categoryData.name,
//                     description: categoryData.description,
//                     // Don't set the 'image' field here
//                 });
//                 console.log('Image Value:', categoryData.image);
//                 console.log('Value:', categoryData.categoryName);

                
//                 const fileName = categoryData.image ? categoryData.image.name : '';
//                 this.selectedFileName = fileName;
//             }
//         } catch (error) {
//             console.error('Error fetching category by ID:', error);
//         }
//     }
// }


  async onSubmit(): Promise<void> {
    if (this.categoryForm.valid) {
      const categoryId = this.categoryForm.get('id')?.value;
      const categoryData = {
        // Retrieve values from the form controls
        id: categoryId,
        name: this.categoryForm.get('categoryName')?.value,
        description: this.categoryForm.get('description')?.value,
        image: this.categoryForm.get('image')?.value,
        offerId: null,
        createdOn: "2024-05-24T02:07:53.677Z",
        createdBy: "0",
        isActive: true,
        lastModifiedOn: "2024-05-24T02:07:53.677Z",
        lastModifiedBy: "0",
      };
  
      try {
        // Update the category using the HTTP service
        await this.httpService.updateCategory(categoryId, categoryData).toPromise();
        console.log('Category updated successfully');
        this.showSuccess();
        // Navigate back to the category list or show a success message
        // this.router.navigate(['/categories']);
      } catch (error) {
        console.error('Error updating category:', error);
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Get the selected file
    if (file) {
        // Update the 'image' form control with the filename of the selected file
        this.categoryForm.get('image').setValue(file.name);
    }
}
showSuccess() 
  {

    Swal.fire({
      title: 'Update Category ',
      text: 'Record Updated Successfully...',
      icon: 'success',
      confirmButtonColor: '#DD6B55',
      }).then((result) => {
      if (result.isConfirmed) 
      {
        this.router.navigate(['/category']);   
      }
    }); 
  } 
}
