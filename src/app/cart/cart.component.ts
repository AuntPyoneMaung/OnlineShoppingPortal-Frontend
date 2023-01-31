import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  public role: string = '';

  constructor(
    private cartService: CartService,
    private userStore: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getAllProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
    this.userStore.getRole().subscribe((value) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = value || roleFromToken;
    });

    if (this.auth.isLoggedIn()) {
      this.role = 'loggedIn';
    }
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }

  alert() {
    alert('Please login to continue');
    this.router.navigate(['/login']);
  }

  alertWIP() {
    alert('Work in Progress. Re-directing back to home page');
    this.router.navigate(['/products']);
  }
}
