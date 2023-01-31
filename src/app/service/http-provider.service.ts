import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebApiService } from './web-api.service';

//var apiUrl = "https://localhost:44370/";

//var apiUrl = "http://192.168.10.10:105";
var apiUrl = 'https://localhost:7201';

var httpLink = {
  getAllCategory: apiUrl + '/api/categories/getAllCategory',
  deleteCategoryById: apiUrl + '/api/categories',
  deleteBrandById: apiUrl + '/api/brand',
  deleteSegmentById: apiUrl + '/api/segment',
  updateUser: apiUrl + '/api/Customer',
  getAllProducts: apiUrl + '/api/products',
  getAllBrand: apiUrl + '/api/brand',
  getAllSegments: apiUrl + '/api/segment',
  getUsers: apiUrl + '/api/Customer/getAllUsers',
  addCategory: apiUrl + '/api/categories',
  addBrand: apiUrl + '/api/brand',
  addSegment: apiUrl + '/api/segment',
  addProduct: apiUrl + '/api/products',
};

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService, private http: HttpClient) {}

  public getAllCategory(): Observable<any> {
    return this.webApiService.get(httpLink.getAllCategory);
  }

  public getAllBrand(): Observable<any> {
    return this.webApiService.get(httpLink.getAllBrand);
  }

  public getAllProducts(): Observable<any> {
    return this.webApiService.get(httpLink.getAllProducts);
  }

  public getAllSegments(): Observable<any> {
    return this.webApiService.get(httpLink.getAllSegments);
  }

  public getUsers(): Observable<any> {
    return this.webApiService.get(httpLink.getUsers);
  }

  public addCategory(cateogry: any): Observable<any> {
    return this.webApiService.post(httpLink.addCategory, cateogry);
  }

  public addBrand(brand: any): Observable<any> {
    return this.webApiService.post(httpLink.addBrand, brand);
  }

  public addProduct(prod: any): Observable<any> {
    return this.webApiService.post(httpLink.addProduct, prod);
  }

  public addSegment(segment: any): Observable<any> {
    return this.webApiService.post(httpLink.addSegment, segment);
  }

  public deleteCategoryById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteCategoryById + model, '');
  }

  public deleteBrandById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteCategoryById + model, '');
  }

  public deleteSegmentById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteSegmentById + model, '');
  }

  public updateUser(id: number, model: any): Observable<any> {
    return this.http.put(`${httpLink.updateUser}/${id}`, model);
  }
}
