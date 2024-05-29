import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import Swal from 'sweetalert2';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss']
})
export class AddproductsComponent implements OnInit {
  images: string[] = [null, null, null, null];
  imageFiles: File[] = [null, null, null, null];
  productForm: UntypedFormGroup;
  categories: any[];
  offers: any[];
  ProductFileNames: any;


  constructor( private httpService: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder) { }

    
  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      ddcategory: ['', Validators.required],
      actualprice: ['', Validators.required],
      offerprice: ['', Validators.required],
      ddoffer: ['', Validators.required],
      offerdate: ['', Validators.required],
      approxdelivery: ['', Validators.required],
      description: ['', Validators.required],
      productImages: this.fb.array([null, null, null, null])
    });
    this.bindProductsDetails();
    this.fetchCategories();
    this.fetchOffers();
  }
  async bindProductsDetails() {
    const ProductId = this.route.snapshot.paramMap.get('id');
    if (ProductId) {
        try {
            const response = await this.httpService.getProductbyid(+ProductId).toPromise();     
            if (response) {
                const ProductData = response;
                console.log(ProductData);
                this.productForm.patchValue({
                    id: ProductData.id,
                    ProductName: ProductData.name || '', // Handle undefined case
                    description: ProductData.description,
                    actualprice: ProductData.description,
                    offerprice: ProductData.description,
                    ddoffer: ProductData.description,
                    offerdate: ProductData.description,
                    approxdelivery: ProductData.description,
                    stock: ProductData.stockquantity  
//                    productImages:ProductData.image,
                    // Don't set the 'image' field here
                });
                this.ProductFileNames = ProductData.image,
                console.log(ProductData);
                console.log('Image Value:', ProductData.image);                                
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
    this.httpService.getCategories().subscribe(
      (response: any[]) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  fetchOffers() {
    this.httpService.getOffers().subscribe(
      (response: any[]) => {
        this.offers = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const currentDateTimeString = new Date().toISOString();

      const productData = {      
        name: formData.productName,
        categoryId: formData.ddcategory,
        description: formData.description,
        stockQuantity: null,
        quantity: null,
        actualPrice: formData.actualprice,
        offerPrice: formData.offerprice,
        offerId: null,
        offerEndOn: new Date(formData.offerdate).toISOString(),
        deliveryDuration: formData.approxdelivery,
        createdOn: currentDateTimeString,
        createdBy: "1",
        isActive: true,
        lastModifiedOn: null,
        lastModifiedBy: null
      };

      console.log(productData);

      this.httpService.saveProduct(productData).subscribe(
        (productResponse: any) => {
          console.log('Product saved successfully:', productResponse);    
          this.saveImages(productResponse.id);
        },
        (error) => {        
          console.error('Error saving product:', error);
        }
      );
    }
  }

  saveImages(productId: number): void {
    this.images.forEach((image: string | File) => {
      if (typeof image === 'string') return;

      const formData = new FormData();
      formData.append('productId', productId.toString());
      formData.append('image', image);

      // this.httpService.saveImage(formData).subscribe(
      //   (imageResponse: any) => {
      //     console.log('Image saved successfully:', imageResponse);
      //   },
      //   (error) => {
      //     console.error('Error saving image:', error);
      //   }
      // );
    });
  }
}
