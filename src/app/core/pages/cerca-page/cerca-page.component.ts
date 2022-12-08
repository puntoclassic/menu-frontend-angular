import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FoodService } from "src/app/amministrazione/services/food.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-cerca-page",
  templateUrl: "./cerca-page.component.html",
  styleUrls: ["./cerca-page.component.scss"],
})
export class CercaPageComponent implements OnInit {
  key: string;
  foods: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.key = params["search"];
    });
  }

  ngOnInit(): void {
    if (this.key != "") {
      this.foodService.searchFoods(this.key).subscribe((result: any) => {
        if (result.foods) {
          this.foods = result.foods;
        } else {
          this.foods = result;
        }
      });
    } else {
      this.router.navigate(["/"]);
    }
  }
}
