import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, map, throwError } from "rxjs";
import { CategoryService } from "src/app/amministrazione/services/category.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-category-create-page",
  templateUrl: "./category-create-page.component.html",
  styleUrls: ["./category-create-page.component.scss"],
})
export class CategoryCreatePageComponent implements OnInit {
  isPending: boolean = false;
  form: FormGroup;
  nomeControl: AbstractControl;
  immagineControl: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private appService: AppService,
    private router: Router,
  ) {
    this.nomeControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
      ],
    });

    this.immagineControl = this.formBuilder.control("", {});

    this.form = this.formBuilder.group({
      name: this.nomeControl,
      image: this.immagineControl,
    });
  }

  ngOnInit(): void {
  }

  filePicked(event: any) {
    var file = event.target.files[0];
    this.immagineControl.clearValidators();

    if (file) {
      this.immagineControl.setErrors({
        fileTooBig: file.size > 1000 * 1000,
        badFileFormat: !["image/jpg", "image/jpeg", "image/png"].includes(
          file.type,
        ),
      });

      this.immagineControl.setValue(file);
    }
  }

  setIsPending(value) {
    this.isPending = value;
  }

  onSubmit(data: any) {
    var appService = this.appService;
    var router = this.router;
    if (this.form.valid) {
      this.isPending = true;
      this.categoryService.createCategory(data).pipe(
        map(() => {
          this.isPending = false;
          this.router.navigate(["/amministrazione/categorie"]).then(() => {
            appService.pushMessage("success", "Categoria creata con successo");
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
