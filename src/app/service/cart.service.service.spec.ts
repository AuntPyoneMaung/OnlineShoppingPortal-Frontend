import { TestBed } from '@angular/core/testing';

import { Cart.ServiceService } from './cart.service.service';

describe('Cart.ServiceService', () => {
  let service: Cart.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cart.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
