import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { HttpService } from 'src/app/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss']
})
export class AddproductsComponent implements OnInit {
  images: string[] = [null, null, null, null];
  imageFiles: File[] = [null, null, null, null];
  productForm: FormGroup;
  categories: any[] = [];
  offers: any[] = [];
  ProductFileNames: any;

  constructor(
    private HttpService: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      ddcategory: ['', Validators.required],
      description: ['', Validators.required],
      stockquantity: ['', Validators.required],
      actualprice: ['', Validators.required],
      offerprice: ['', Validators.required],
      ddoffer: ['', Validators.required],
      offerdate: ['', Validators.required],
      approxdelivery: ['', Validators.required]
    });

    this.fetchCategories();
    this.fetchOffers();
    this.bindProductsDetails();
  }

  async bindProductsDetails() {
    const ProductId = this.route.snapshot.paramMap.get('id');
    if (ProductId) {
      try {
        const response = await this.HttpService.getProductbyid(+ProductId).toPromise();
        console.log('Product response:', response); // Log the entire response

        if (response) {
          const ProductData = response;
          console.log('Product Data:', ProductData); // Log ProductData

          // Format the date to yyyy-MM-dd
          const formattedOfferDate = new Date(ProductData.offerEndOn).toISOString().split('T')[0];

          this.productForm.patchValue({
            id: ProductData.id,
            ddcategory:ProductData.categoryId,
            productName: ProductData.name,
            description: ProductData.description,
            actualprice: ProductData.actualPrice,
            offerprice: ProductData.offerPrice,
            ddoffer: ProductData.offerId,
            offerdate: formattedOfferDate,
            approxdelivery: ProductData.deliveryDuration,
            stockquantity: ProductData.stockQuantity
          });

          this.ProductFileNames = ProductData.image;
        }
      } catch (error) {
        console.error('Error fetching Product by ID:', error);
      }
    }
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFiles[index] = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  fetchCategories() {
    this.HttpService.getCategories().subscribe(
      (response: any[]) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchOffers() {
    this.HttpService.getOffers().subscribe(
      (response: any[]) => {
        this.offers = response;
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
  }

  onSubmit(): void {
    const ProductId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const currentDateTimeString = new Date().toISOString();
  
      let productData: any = {          
        name: formData.productName,
        categoryId: formData.ddcategory,
        description: formData.description,
        stockQuantity: formData.stockquantity, 
        quantity: null,
        actualPrice: formData.actualprice,
        offerPrice: formData.offerprice,
        offerId: formData.ddoffer,
        offerEndOn: new Date(formData.offerdate).toISOString(),
        deliveryDuration: formData.approxdelivery,
        isActive: true,
        lastModifiedOn: !isNaN(ProductId) ? currentDateTimeString : null,
        lastModifiedBy: !isNaN(ProductId) ? '1' : null
      };
  
      if (isNaN(ProductId)) {
        productData.createdOn = currentDateTimeString;
        productData.createdBy = '1';
      }
      else {        
        console.log('product id is :',ProductId)
        productData.id = ProductId;
      }
      
  
      console.log(productData.stockQuantity);
      console.log('Form Data:', formData);
      console.log('before save or insert', JSON.stringify(productData, null, 2));
  
      if (!isNaN(ProductId) && ProductId !== 0) {
        // Update existing product
        this.HttpService.updateProduct(ProductId, productData).subscribe(
          (productResponse: any) => {
            console.log('Product updated successfully:', productResponse);
            if (productResponse && productResponse.id) {
              this.saveImages(productResponse.id);
            } else {
              console.warn('No product ID returned in the response');
            }
            Swal.fire({
              title: 'Success',
              text: 'Product updated successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/products']);
            });
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      } else {
        // Save new product
        this.HttpService.saveProduct(productData).subscribe(
          (productResponse: any) => {
            console.log('Product saved successfully:', productResponse);
            if (productResponse && productResponse.id) {
              this.saveImages(productResponse.id);
            } else {
              console.warn('No product ID returned in the response');
            }
            Swal.fire({
              title: 'Success',
              text: 'Product saved successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/addproducts']);
            });
          },
          (error) => {
            console.error('Error saving product:', error);
          }
        );
      }
    }
  }
  

  saveImages(productId: number): void {
    this.images.forEach((image: string | File) => {
      if (typeof image === 'string') return;

      const formData = new FormData();
      formData.append('productId', productId.toString());
      formData.append('image', image);

      // Assuming saveImage API is present in HttpService
      // this.HttpService.saveImage(formData).subscribe(
      //   (response) => {
      //     console.log('Image saved successfully:', response);
      //   },
      //   (error) => {
      //     console.error('Error saving image:', error);
      //   }
      // );
    });
  }
}
