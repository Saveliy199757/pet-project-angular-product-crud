import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiJsonServerService {

  baseUrl = "http://localhost:3000/productLists/";

  constructor(private http: HttpClient) { }

  postProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, data);
  }

  getProduct(): Observable<Product> {
    return this.http.get<Product>(this.baseUrl)
  }

  putProduct(data: Product, id: any): Observable<Product> {
    return this.http.put<Product>(this.baseUrl+id, data)
  }

  deleteProduct(id: any): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl+id);
  }

}
