import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CartService } from "src/app/cart/services/cart.service";

@Component({
  selector: "[app-carrello-row]",
  templateUrl: "./carrello-row.component.html",
  styleUrls: ["./carrello-row.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CarrelloRowComponent implements OnInit {
  @Input()
  actionsVisible: boolean = false;

  @Input()
  row: any;

  @Input()
  key: any;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  onIncreaseQtaClick() {
    this.cartService.increaseQta(this.row.item);
  }

  onDecreaseQtaClick() {
    this.cartService.decreaseQta(this.row.item);
  }

  onDeleteFromCartClick() {
    this.cartService.removeFromCart(this.row.item);
  }
}
