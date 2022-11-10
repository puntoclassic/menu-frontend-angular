import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AccountService } from "src/app/account/services/account.service";
import { ResetPasswordWithTokenRequest } from "src/app/account/types/formTypes";
import EmailBusyValidator from "src/app/account/validators/emailBusyValidator";
import { passwordMatch } from "src/app/account/validators/passwordMatch";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-reset-password-token-page",
  templateUrl: "./reset-password-token-page.component.html",
  styleUrls: ["./reset-password-token-page.component.scss"],
})
export class ResetPasswordTokenPageComponent implements OnInit {
  isPending: boolean;
  form: FormGroup;
  tokenControl: AbstractControl;
  passwordControl: AbstractControl;
  confirmPasswordControl: AbstractControl;

  constructor(
    private appService: AppService,
    private accountService: AccountService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.tokenControl = this.formBuilder.control("", {
      updateOn: "change",
      validators: [
        Validators.required,
      ],
    });

    this.passwordControl = this.formBuilder.control("", {
      updateOn: "change",
      validators: [
        Validators.required,
        Validators.pattern(
          RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
          ),
        ),
      ],
    });

    this.confirmPasswordControl = this.formBuilder.control("", {
      updateOn: "change",
      validators: [
        Validators.required,
        Validators.pattern(RegExp("^[a-zA-Z]")),
      ],
    });

    this.form = this.formBuilder.group({
      token: this.tokenControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl,
    }, {
      updateOn: "change",
      validators: [
        passwordMatch(),
      ],
    });

    this.currentRoute.queryParams.subscribe((params: Params) => {
      this.tokenControl.setValue(params.token ?? null);
    });
  }

  ngOnInit(): void {
    if (!this.tokenControl.value) {
      this.router.navigate(["/account/login"]).then(() => {
        this.appService.pushMessage("error", "Richiesta non valida");
      });
    }
  }

  onFormSubmit(data: ResetPasswordWithTokenRequest) {
    if (this.form.valid) {
      this.isPending = true;
      this.accountService.resetPasswordWithToken(data).subscribe((result) => {
        this.isPending = false;

        this.router.navigate(["/account/login"]).then(() => {
          if (result) {
            this.appService.pushMessage(
              "success",
              "Password cambiata con successo",
            );
          } else {
            this.appService.pushMessage(
              "error",
              "Si è verificato un errore",
            );
          }
        });
      });
    }
  }
}
