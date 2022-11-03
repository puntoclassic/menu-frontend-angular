import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CartService, CartState } from "src/app/cart/services/cart.service";

@Component({
  selector: "app-tipologia-consegna-page",
  templateUrl: "./tipologia-consegna-page.component.html",
  styleUrls: ["./tipologia-consegna-page.component.scss"],
})
export class TipologiaConsegnaPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tipologiaConsegnaControl: AbstractControl;
  cartState: CartState;
  cartStateSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.cartStateSubscription = this.cartService.cartStatus.subscribe(
      (cartState) => {
        this.cartState = cartState;
      },
    );

    this.tipologiaConsegnaControl = this.formBuilder.control("", [
      Validators.required,
    ]);

    this.form = this.formBuilder.group({
      tipologiaConsegna: this.tipologiaConsegnaControl,
    });
  }

  ngOnDestroy(): void {
    this.cartStateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.tipologiaConsegnaControl.setValue(this.cartState.tipologia_consegna);
  }

  onSubmit(value: { tipologiaConsegna: string }) {
    if (this.form.valid) {
      this.cartService.updateTipologiaConsegna(value.tipologiaConsegna);
      switch (value.tipologiaConsegna) {
        case "asporto":
          this.router.navigate(["/checkout/riepilogoOrdine"]);
          break;
        case "domicilio":
          this.router.navigate(["/checkout/informazioniConsegna"]);
          break;
      }
    }
  }
}
