import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable } from "rxjs";

export type CartState = {
  items: any;
  total: number;
  tipologia_consegna: string;
  indirizzo: string;
  orario: string;
  note: string;
};

@Injectable({
  providedIn: "root",
})
export class CartService {
  cartStatus = new BehaviorSubject<CartState>({
    items: {},
    total: 0,
    indirizzo: "",
    orario: "",
    note: "",
    tipologia_consegna: "asporto",
  });

  constructor(
    private http: HttpClient,
  ) {
    this.fetchFromCookie();
  }

  updateIndirizzoOrario(indirizzo: string, orario: string) {
    var state = this.cartStatus.getValue();
    state.indirizzo = indirizzo;
    state.orario = orario;

    this.cartStatus.next(state);
  }

  updateTipologiaConsegna(tipologia_consegna: string) {
    var state = this.cartStatus.getValue();
    state.tipologia_consegna = tipologia_consegna;

    this.cartStatus.next(state);
  }

  updateNote(note: string) {
    var state = this.cartStatus.getValue();
    state.note = note;

    this.cartStatus.next(state);
  }

  fetchFromCookie() {
    this.http.get("api/cart/cookie").subscribe((items: string) => {
      var state = this.cartStatus.getValue();
      state.items = items;

      this.notififyChange(state);
    });
  }

  addToCart(item: any) {
    var state = this.cartStatus.getValue();

    state.items[item.id] = {
      item: item,
      quantity: 1,
    };

    this.notififyChange(state);
  }

  removeFromCart(item: any) {
    var state = this.cartStatus.getValue();

    delete state.items[item.id];
    this.notififyChange(state);
  }

  increaseQta(item: any) {
    var state = this.cartStatus.getValue();

    state.items[item.id].quantity += 1;

    this.notififyChange(state);
  }

  decreaseQta(item: any) {
    var state = this.cartStatus.getValue();

    if (state.items[item.id].quantity > 1) {
      state.items[item.id].quantity -= 1;
    } else {
      //altrimenti elimina il prodotto
      delete state.items[item.id];
    }
    this.notififyChange(state);
  }

  notififyChange(state: CartState) {
    var total = 0;
    Object.values(state.items).forEach((row: any) => {
      total += row.item.price! *
        row.quantity;
    });

    state.total = total;

    this.http.post("api/cart/cookie", { cart: state.items }).subscribe();

    this.cartStatus.next(state);
  }
}
