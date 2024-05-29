import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})

export class AddcategoryComponent implements OnInit {
  categoryForm: FormGroup;
  selectedFileName: string;
  FileName: any;
  imageSrc: string | ArrayBuffer | null = null;
  images: string[] = [null];
  imageFiles: File[] = [null];

  constructor(private router: Router,private fb: FormBuilder, private httpService: HttpService,) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  // onSubmit() {
  //   if (this.categoryForm.valid) {
  //     console.log('Form submitted:', this.categoryForm.value);
  //     this.router.navigate(['/maps']);
      
  //   }
  // }
  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData = {
        name: this.categoryForm.get('categoryName')?.value,
        description: this.categoryForm.get('description')?.value,
        image: this.categoryForm.get('image')?.value,
        createdOn: new Date().toISOString(), // Assuming you want to set current date/time
        createdBy: "0", // Assuming default value
        isActive: true, // Assuming default value
        lastModifiedOn: new Date().toISOString(), // Assuming you want to set current date/time
        lastModifiedBy: "0" // Assuming default value
      };
  
      console.log('Category data:', categoryData);
  
      this.httpService.InsertCategory(categoryData).subscribe(
        response => {
          // Handle successful response
          console.log('Category added:', response);
          this.showSuccess();
          // this.router.navigate(['/category']);
          // Reset the form after successful submission
          this.categoryForm.reset();
          // this.router.navigate(['/category']); // Navigate to desired route after submission
        },
        error => {
          // Handle error
          console.error('Error adding category:', error);
        }
      );
    }
  }
  

//   onFileSelected(event: any) {
//     const file: File = event.target.files[0]; 
//     if (file) {
        
//         this.categoryForm.get('image').setValue(file.name);
//     }
// }
onFileSelected(event: Event, index: number): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    this.imageFiles[index] = file;
    this.categoryForm.get('image').setValue(this.imageFiles[0].name);
    console.log(this.imageFiles[0].name,"filename")
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.images[index] = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
showSuccess() 
  {

    Swal.fire({
      title: 'Insert Category ',
      text: 'Record Insert Successfully...',
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
