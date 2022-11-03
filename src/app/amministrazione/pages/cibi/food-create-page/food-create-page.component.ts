import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  map,
  Subscription,
  throwError,
} from "rxjs";
import { CategoryService } from "src/app/amministrazione/services/category.service";
import { FoodService } from "src/app/amministrazione/services/food.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-food-create-page",
  templateUrl: "./food-create-page.component.html",
  styleUrls: ["./food-create-page.component.scss"],
})
export class FoodCreatePageComponent implements OnInit, OnDestroy {
  isPending: boolean = false;
  form: FormGroup;
  nomeControl: AbstractControl;
  ingredientsControl: AbstractControl;
  priceControl: AbstractControl;
  categoryControl: AbstractControl;
  categorySubscription: Subscription;
  categories: [];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private foodService: FoodService,
    private appService: AppService,
    private router: Router,
  ) {
    this.categorySubscription = this.categoryService.fetchCategoriesObservable(
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
      ).subscribe((response: any) => {
        this.categories = response;
      });

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
  }

  sanitizePrice() {
    this.priceControl.setValue(this.priceControl.value.replace(",", "."));
    this.priceControl.updateValueAndValidity();
  }

  onSubmit(data: any) {
    if (this.form.valid) {
      this.isPending = true;
      this.foodService.createFood(data).pipe(
        map(() => {
          this.isPending = false;
          this.router.navigate(["/amministrazione/cibi"]).then(() => {
            this.appService.pushMessage(
              "success",
              "Cibo creato con successo",
            );
          });
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
