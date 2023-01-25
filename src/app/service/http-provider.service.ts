import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebApiService } from './web-api.service';

//var apiUrl = "https://localhost:44370/";

//var apiUrl = "http://192.168.10.10:105";
var apiUrl = 'https://localhost:7201';

var httpLink = {
  getAllCategory: apiUrl + '/api/categories/getAllCategory',
  deleteCategoryById: apiUrl + '/api/categories/deleteEmployeeById',
  getEmployeeDetailById: apiUrl + '/api/categories/getEmployeeDetailById',
  saveEmployee: apiUrl + '/api/categories/saveEmployee',
  getAllProducts: apiUrl + '/api/products',
  getUsers: apiUrl + '/api/User/getAllUsers',
  addCategory: apiUrl + '/api/categories',
};

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) {}

  public getAllCategory(): Observable<any> {
    return this.webApiService.get(httpLink.getAllCategory);
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

  public deleteCategoryById(model: any): Observable<any> {
    return this.webApiService.post(
      httpLink.deleteCategoryById + '?employeeId=' + model,
      ''
    );
  }

  public getEmployeeDetailById(model: any): Observable<any> {
    return this.webApiService.get(
      httpLink.getEmployeeDetailById + '?employeeId=' + model
    );
  }

  public saveEmployee(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveEmployee, model);
  }
}
