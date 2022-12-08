import { Component, inject, OnInit } from "@angular/core";
import { CategoryService } from "src/app/amministrazione/services/category.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-category-pills",
  templateUrl: "./category-pills.component.html",
  styleUrls: ["./category-pills.component.scss"],
})
export class CategoryPillsComponent implements OnInit {
  items: [];

  categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.categoryService.categories.subscribe((categories) => {
      this.items = categories;
    });
  }
}
