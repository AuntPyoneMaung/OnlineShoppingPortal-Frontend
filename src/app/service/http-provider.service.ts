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
  saveEmployee: apiUrl + '/api/categories/saveEmployee',
  getAllProducts: apiUrl + '/api/products',
  getAllBrand: apiUrl + '/api/brand',
  getUsers: apiUrl + '/api/User/getAllUsers',
  addCategory: apiUrl + '/api/categories',
  addBrand: apiUrl + '/api/brand',
};

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) {}

  public getAllCategory(): Observable<any> {
    return this.webApiService.get(httpLink.getAllCategory);
  }

  public getAllBrand(): Observable<any> {
    return this.webApiService.get(httpLink.getAllBrand);
  }

  public getUsers(): Observable<any> {
    return this.webApiService.get(httpLink.getUsers);
  }

  public getAllProducts(): Observable<any> {
    return this.webApiService.get(httpLink.getAllProducts);
  }

  public addCategory(cateogry: any): Observable<any> {
    return this.webApiService.post(httpLink.addCategory, cateogry);
  }

  public addBrand(brand: any): Observable<any> {
    return this.webApiService.post(httpLink.addBrand, brand);
  }

  public deleteCategoryById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteCategoryById + model, '');
  }

  public deleteBrandById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteCategoryById + model, '');
  }

  public saveEmployee(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveEmployee, model);
  }
}
