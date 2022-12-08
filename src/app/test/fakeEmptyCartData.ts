import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { CartService } from "src/app/cart/services/cart.service";

export const fakeEmptyCartData = () => {
  //CART DATA
  spyOn(CartService.prototype, "fetchFromCookie").and.returnValue(of({}));
  spyOn(CartService.prototype, "sendCartToServer").and.callFake(() => {
  });
};
