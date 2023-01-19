import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// service to get and store user data from the data stream (observable)
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');

  constructor() {}

  public getRole() {
    return this.role$.asObservable(); // stream of data
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullName() {
    return this.fullName$.asObservable();
  }

  public setFullName(fullname: string) {
    this.fullName$.next(fullname);
  }
}
