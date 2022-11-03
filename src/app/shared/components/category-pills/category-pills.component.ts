import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-category-pills",
  templateUrl: "./category-pills.component.html",
  styleUrls: ["./category-pills.component.scss"],
})
export class CategoryPillsComponent implements OnInit {
  items: [];

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.categories.subscribe((categories) => {
      this.items = categories;
    });
  }
}
