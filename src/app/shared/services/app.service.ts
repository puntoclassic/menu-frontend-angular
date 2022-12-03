import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, map, Observable, ReplaySubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  settings = new ReplaySubject<[]>(1);
  categories = new BehaviorSubject<[]>([]);
  messages = new Subject<{ type: string; message: string }>();
  cartItems$: Observable<any>;
  lastCartItems: any;

  constructor(
    private http: HttpClient,
  ) {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get<[]>("api/categories", {
      params: {
        "paginated": false,
      },
    }).pipe(map((response: any) => {

      return response.map((item: any) => {
        return {
          slug: item.slug,
          name: item.name,
        };
      });
    })).subscribe((data: any) => this.categories.next(data));
  }

  searchFoods(search: string) {
    return this.http.get<[]>("api/foods/cerca", {
      params: {
        search: search,
      },
    });
  }

  pushMessage(type: string, msg: string) {
    this.messages.next({ type: type, message: msg });
  }
}
