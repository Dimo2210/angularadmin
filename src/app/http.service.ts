import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}Categories`);
  }
  login(loginData: { userlogin: string, Password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}UserLogins/login`, loginData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}Categories/${id}`);
  }

  getbyidcategory(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}Categories/${id}`);
  }
  // updateCategory(categoryId: number, categoryData: any): Observable<any> {
  //   return this.http.put<any>(`${environment.apiUrl}Categories/${categoryId}`, categoryData);
  // }
  updateCategory(categoryId: number, categoryData: any): Observable<any> {
    // Send the updated category data in the request body
    return this.http.put<any>(`${environment.apiUrl}Categories/${categoryId}`, categoryData);
  }
  
  InsertCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}Categories`, categoryData);
  }
   saveProduct(productData: any): Observable<any> {
    // return this.http.post<any>(`${environment.apiUrl}Products`, productData, { headers: this.headers });
     return this.http.post<any>(`${environment.apiUrl}Products`, productData);
  }

  UserLogins(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}UserLogins`);
  }
  deleteUserLogins(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}UserLogins/${id}`);
  }
  
  getbyiduserlogin(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}UserLogins/${id}`);
  }
  
  // login(email: string, password: string) {
  //   return this.http.post<any>(`${environment.apiUrl}UserLogin`, { email, password });
  // }
}
