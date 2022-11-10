import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "src/app/account/services/account.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-verifica-account-page",
  templateUrl: "./verifica-account-page.component.html",
  styleUrls: ["./verifica-account-page.component.scss"],
})
export class VerificaAccountPageComponent implements OnInit {
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
        ]),
      ],
    });
  }

  ngOnInit(): void {
  }

  onFormSubmit(value: any) {
    if (this.form.valid) {
      this.isPending = true;
      this.accountService.resendActivationEmail(value.email).subscribe(() => {
        this.appService.pushMessage(
          "success",
          "Email inviata, controlla la tua casella di posta",
        );
        this.isPending = false;
      });
    }
  }
}
