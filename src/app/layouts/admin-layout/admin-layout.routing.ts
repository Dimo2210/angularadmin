import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {AddcategoryComponent} from '../../pages/addcategory/addcategory.component';
import {EditcategoryComponent} from '../../pages/editcategory/editcategory.component';
import {CategoryComponent} from '../../pages/category/category.component';
import {CustomerComponent} from '../../pages/customer/customer.component';
import {StaffspageComponent} from '../../pages/staffspage/staffspage.component';
import {AddstaffComponent} from '../../pages/addstaff/addstaff.component';
import {ProductsComponent} from '../../pages/products/products.component';
import {AddproductsComponent} from '../../pages/addproducts/addproducts.component';
import {OffersComponent} from '../../pages/offers/offers.component';
import {OrdersComponent} from '../../pages/orders/orders.component';
import {AddoffersComponent} from '../../pages/addoffers/addoffers.component';
import {EditstaffComponent} from '../../pages/editstaff/editstaff.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'addcategory',           component: AddcategoryComponent },
    { path: 'editcategory',           component: EditcategoryComponent },
    { path: 'category',           component: CategoryComponent },
    { path: 'customer',           component: CustomerComponent },
    { path: 'staffspage',           component: StaffspageComponent },
    { path: 'addstaff',           component: AddstaffComponent },
    { path: 'products',           component: ProductsComponent },
    { path: 'addproducts',           component: AddproductsComponent },
    { path: 'offers',           component: OffersComponent },
    { path: 'addoffers',           component: AddoffersComponent },
    { path: 'orders',           component: OrdersComponent },
    { path: 'editstaff',           component: EditstaffComponent }
];
