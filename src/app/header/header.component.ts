import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public searchTerm!: string;
  public fullName: string = '';
  public role: string = '';
  public loggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private userStore: UserService
  ) {}

  ngOnInit(): void {
    this.cartService.getAllProducts().subscribe((res) => {
      this.totalItem = res.length;
    });

    this.userStore.getFullName().subscribe((value) => {
      let fullNameFromToken = this.auth.getNameFromToken();
      this.fullName = value || fullNameFromToken; // in case of refresh page, get from token as observable is emptied
    });

    this.userStore.getRole().subscribe((value) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = value || roleFromToken;
    });

    this.loginStatus();
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  signout() {
    this.auth.signout();
  }

  loginStatus() {
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
    }
  }
}
