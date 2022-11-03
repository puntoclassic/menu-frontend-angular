import { TestBed } from '@angular/core/testing';

import { CartFilledGuard } from './cart-filled.guard';

describe('CartFilledGuard', () => {
  let guard: CartFilledGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CartFilledGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
