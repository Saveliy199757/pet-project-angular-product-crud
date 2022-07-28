import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiJsonServerService {

  baseUrl = "http://localhost:3000/productLists";

  constructor(private http: HttpClient) { }

  postProduct(data: any): Observable<Object> {
    return this.http.post(this.baseUrl, data);
  }

  getProduct(): Observable<Object> {
    return this.http.get(this.baseUrl)
  }
}
