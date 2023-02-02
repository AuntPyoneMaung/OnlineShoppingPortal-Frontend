import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  // observable, also help emit data
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor() {}
  // getter
  getAllProducts() {
    return this.productList.asObservable();
  }
  // setter
  setProduct(product: any) {
    this.cartItemList.push({ ...product, qty: 1 });
    // pass data whenever subscribed
    this.productList.next(product);
  }

  addtoCart(product: any) {
    this.cartItemList.push(product);
    // .next() defines how to process the data sent by the observable.
    // The observable function sends data to the observer by
    // calling the observer's next method and passing the data
    // as an argument. Calling the observer's callback function
    // to send data is called emitting data.

    //  send messages to an observable which are then sent to all angular
    // components that are subscribers of that observable.
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.productPrice * a.quantity;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.indexOf(product, 0);
    if (index > -1) {
      this.cartItemList.splice(index, 1);
    }
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
