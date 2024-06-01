import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(loginData: { userlogin: string, Password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}UserLogins/login`, loginData);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}Categories`);
  }
 
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}Categories/${id}`);
  }

  getbyidcategory(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}Categories/${id}`);
  }
  updateCategory(categoryId: number, categoryData: any): Observable<any> {
    // Send the updated category data in the request body
    return this.http.put<any>(`${environment.apiUrl}Categories/${categoryId}`, categoryData);
  }
  
  InsertCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}Categories`, categoryData);
  }
  
  //#region  Products API Start here - >
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}Products`);
  }
 
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}Products/${id}`);
  }

  getProductbyid(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}Products/${id}`);
  }
  updateProduct(ProductId: number, ProductData: any): Observable<any> {
    // Send the updated category data in the request body
    return this.http.put<any>(`${environment.apiUrl}Products/${ProductId}`, ProductData);
  }
   saveProduct(productData: any): Observable<any> {    
     return this.http.post<any>(`${environment.apiUrl}Products`, productData);
  }
  //#endregion Products API End here - >

  //#region  Offers API Start here - >
  getOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}OffersCoupons`);
  }
 
  deleteOffer(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}OffersCoupons/${id}`);
  }

  getOfferbyid(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}OffersCoupons/${id}`);
  }
  updateOffers(OfferId: number, OfferData: any): Observable<any> {
    // Send the updated category data in the request body
    return this.http.put<any>(`${environment.apiUrl}OffersCoupons/${OfferId}`, OfferData);
  }
  //#endregion Offers API End here - >

  //#region  Orders API Start here - >
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}Orders`);
  }
  getNewOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}Orders`);
  }
  getPendingOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}Orders`);
  }
  getCompletedOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}Orders`);
  }
  UpdateOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}Orders`);
  }
  //#endregion Orders API End here - >

  UserLogins(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}UserLogins`);
  }
  deleteUserLogins(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}UserLogins/${id}`);
  }
  
  getbyiduserlogin(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}UserLogins/${id}`);
  }
  getuserlogin(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}UserRoles`);
  }
  insertuser(UserData: any): Observable<any> {
    // return this.http.post<any>(`${environment.apiUrl}Products`, productData, { headers: this.headers });
     return this.http.post<any>(`${environment.apiUrl}UserLogins`, UserData);
  }

  updatestaff(userId: number, userData: any): Observable<any> {
    // Send the updated category data in the request body
    return this.http.put<any>(`${environment.apiUrl}UserLogins/${userId}`, userData);
  }
  // login(email: string, password: string) {
  //   return this.http.post<any>(`${environment.apiUrl}UserLogin`, { email, password });
  // }
}
