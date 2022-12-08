import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlStatus,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CategoryService } from "src/app/amministrazione/services/category.service";
import { FoodService } from "src/app/amministrazione/services/food.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-food-edit-page",
  templateUrl: "./food-edit-page.component.html",
  styleUrls: ["./food-edit-page.component.scss"],
})
export class FoodEditPageComponent implements OnInit {
  isPending: boolean = false;
  form: FormGroup;
  nomeControl: AbstractControl;
  ingredientsControl: AbstractControl;
  priceControl: AbstractControl;
  categoryControl: AbstractControl;
  categorySubscription: Subscription;
  categories: [];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private foodService: FoodService,
    private appService: AppService,
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) {
    this.currentRoute.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    this.categorySubscription = this.fetchCategories().subscribe(
      (response: any) => {
        this.categories = response;
      },
    );

    this.nomeControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
      ],
    });

    this.ingredientsControl = this.formBuilder.control("");

    this.priceControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
        Validators.pattern(
          "\\d{1,3}[,.]?(\\d{1,2})?",
        ),
        Validators.min(0.01),
      ],
    });

    this.categoryControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
      ],
    });

    this.form = this.formBuilder.group({
      name: this.nomeControl,
      ingredients: this.ingredientsControl,
      price: this.priceControl,
      category_id: this.categoryControl,
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchData().subscribe();
  }

  fetchCategories() {
    return this.categoryService.fetchAdminCategories(
      {
        paginated: false,
      },
    )
      .pipe(
        map((item: any) => {
          return item.categories.map((item) => {
            return {
              id: item.id,
              name: item.name,
            };
          });
        }),
      );
  }

  fetchData() {
    return this.foodService.getFood(this.id).pipe(
      map((response: any) => {
        this.nomeControl.setValue(response.name);
        this.ingredientsControl.setValue(response.ingredients);
        this.priceControl.setValue(parseFloat(response.price).toFixed(2));
        this.categoryControl.setValue(response.categoryId);
      }),
      catchError(() => {
        this.router.navigate(["./"]);
        return throwError(() => new Error("badRequest"));
      }),
    );
  }

  onSubmit(data: any) {
    if (this.form.valid) {
      this.isPending = true;
      this.foodService.updateFood(this.id, data).pipe(
        map(() => {
          this.isPending = false;

          this.appService.pushMessage(
            "success",
            "Cibo aggiornato con successo",
          );

          this.fetchData().subscribe();
        }),
        catchError(() => {
          this.isPending = false;
          this.appService.pushMessage("error", "Si è verificato un errore");
          return throwError(() => new Error("badRequest"));
        }),
      ).subscribe();
    }
  }
}
