import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AddcategoryComponent } from './pages/addcategory/addcategory.component';
import { EditcategoryComponent } from './pages/editcategory/editcategory.component';
import { CategoryComponent } from './pages/category/category.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { StaffspageComponent } from './pages/staffspage/staffspage.component';
import { AddstaffComponent } from './pages/addstaff/addstaff.component';
import { AddproductsComponent } from './pages/addproducts/addproducts.component';
import { AddoffersComponent } from './pages/addoffers/addoffers.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { OffersComponent } from './pages/offers/offers.component';
import { EditstaffComponent } from './pages/editstaff/editstaff.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
     ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    CategoryComponent,
    CustomerComponent,
    StaffspageComponent,
    AddstaffComponent,
    AddproductsComponent,
    AddoffersComponent,
    OrdersComponent,
    ProductsComponent,
    OffersComponent,
    EditstaffComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
