import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";
import { Product } from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiJsonServerService {

  private baseUrl = "http://localhost:3000/productLists/";
  public products: Product[] = [];
  public $products = new Subject()

  constructor(private http: HttpClient) { }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(map((products:Product[]) => {
      this.products = products;
      return products;
    }));
  }

  putProduct(data: Product, id: any): Observable<Product[]> {
    return this.http.put<Product[]>(this.baseUrl+id, data)
  }

  deleteProduct(id: any): Observable<Product[]> {
    this.products = this.products.filter(product => product.id !== id);
    return this.http.delete<Product[]>(this.baseUrl+id);
  }

}
