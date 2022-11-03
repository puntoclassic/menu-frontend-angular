import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  CreateCategoryData,
  FetchCategoryRequest,
  UpdateCategoryData,
} from "src/app/amministrazione/types";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  fetchCategories(data: FetchCategoryRequest) {
    return this.http.post("api/admin/category", data);
  }

  fetchCategoriesObservable(data: FetchCategoryRequest) {
    return this.http.post("api/admin/category", data);
  }

  getCategory(id: number) {
    return this.http.get("api/categories/" + id);
  }

  getCategoryBySlug(slug: string) {
    return this.http.get<any>("api/categories/bySlug/" + slug);
  }

  createCategory(data: CreateCategoryData) {
    var formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);

    return this.http.post("api/admin/category/create/", formData);
  }

  updateCategory(id: number, data: UpdateCategoryData) {
    var formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    formData.append("id", "" + id);

    return this.http.post("api/admin/category/update/", formData);
  }

  deleteCategory(id: number) {
    return this.http.post("api/admin/category/delete/", {
      id: id,
    });
  }
}
