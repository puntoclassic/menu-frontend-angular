import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  CreateFoodData,
  FetchFoodRequest,
  UpdateFoodData,
} from "src/app/amministrazione/types";

@Injectable({
  providedIn: "root",
})
export class FoodService {
  foodResponse$: BehaviorSubject<{ foods: []; count: number }> =
    new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  fetchFoods(data: FetchFoodRequest) {
    return this.http.post("api/admin/food", data);
  }

  getFood(id: number) {
    return this.http.get("api/foods/" + id);
  }

  getFoodsByCategorySlug(slug: string) {
    return this.http.get<any>("api/foods/byCategorySlug?slug=" + slug);
  }

  createFood(data: CreateFoodData) {
    data.price = parseFloat(data.price.toString().replace(",", "."));

    return this.http.post("api/admin/food/create/", data);
  }

  updateFood(id: number, data: UpdateFoodData) {
    data.id = id;
    data.price = parseFloat(data.price.toString().replace(",", "."));
    return this.http.post("api/admin/food/update/", data);
  }

  deleteFood(id: number) {
    return this.http.post("api/admin/food/delete/", {
      id: id,
    });
  }
}
