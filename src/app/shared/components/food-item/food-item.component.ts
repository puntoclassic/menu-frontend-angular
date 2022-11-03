import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-food-item",
  templateUrl: "./food-item.component.html",
  styleUrls: ["./food-item.component.scss"],
})
export class FoodItemComponent implements OnInit {
  @Input()
  item: any;

  @Input()
  showCategoryPill: boolean = false;

  priceFormatted: string;

  constructor() {}

  ngOnInit(): void {
    this.priceFormatted = parseFloat(this.item.price).toFixed(2);
  }
}
