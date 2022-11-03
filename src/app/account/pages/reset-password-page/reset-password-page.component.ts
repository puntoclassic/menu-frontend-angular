import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "src/app/account/services/account.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-reset-password-page",
  templateUrl: "./reset-password-page.component.html",
  styleUrls: ["./reset-password-page.component.scss"],
})
export class ResetPasswordPageComponent implements OnInit {
  isPending: boolean;
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private accountService: AccountService,
    private appService: AppService,
  ) {
    this.form = formBuilder.group({
      "email": [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
        ]),
      ],
    });
  }

  ngOnInit(): void {
  }

  onFormSubmit(value: any) {
    if (this.form.valid) {
      this.isPending = true;
      this.accountService.resetPasswordEmail(value.email).subscribe(
        (result) => {
          if (result) {
            this.appService.pushMessage(
              "success",
              "Controlla la tua casella di posta",
            );
          } else {
            this.appService.pushMessage(
              "error",
              "Si è verificato un errore inaspettato",
            );
          }
          this.isPending = false;
        },
      );
    }
  }
}
