import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import {
  CreateCategoryData,
  FetchCategoryRequest,
  UpdateCategoryData,
} from "src/app/amministrazione/types";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  categories = new BehaviorSubject<[]>([]);

  constructor(private http: HttpClient) {
    this.fetchCategories().pipe(map((response: any) => {
      return response.map((item: any) => {
        return {
          slug: item.slug,
          name: item.name,
        };
      });
    })).subscribe((data: any) => this.categories.next(data));
  }

  fetchCategories() {
    return this.http.get<any[]>("api/categories", {
      params: {
        "paginated": false,
      },
    });
  }

  fetchAdminCategories(data: FetchCategoryRequest) {
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
