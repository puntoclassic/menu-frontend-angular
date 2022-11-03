import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "src/app/account/services/account.service";
import { SigninFields } from "src/app/account/types/formTypes";
import EmailBusyValidator from "src/app/account/validators/emailBusyValidator";
import { passwordMatch } from "src/app/account/validators/passwordMatch";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-signin-page",
  templateUrl: "./signin-page.component.html",
  styleUrls: ["./signin-page.component.scss"],
})
export class SigninPageComponent implements OnInit {
  isPending: boolean;
  signinForm: FormGroup;
  emailControl: AbstractControl;
  firstnameControl: AbstractControl;
  lastnameControl: AbstractControl;
  passwordControl: AbstractControl;
  confirmPasswordControl: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.firstnameControl = this.formBuilder.control("", {
      updateOn: "change",
      validators: [
        Validators.required,
        Validators.pattern(RegExp("^[a-zA-Z]")),
      ],
    });

    this.lastnameControl = this.formBuilder.control("", {
      updateOn: "change",
      validators: [
        Validators.required,
        Validators.pattern(RegExp("^[a-zA-Z]")),
      ],
    });

    this.emailControl = this.formBuilder.control("", {
      updateOn: "change",
      validators: [
        Validators.required,
        Validators.email,
      ],
      asyncValidators: [
        EmailBusyValidator.createValidator(accountService),
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

    this.signinForm = this.formBuilder.group({
      email: this.emailControl,
      firstname: this.firstnameControl,
      lastname: this.lastnameControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl,
    }, {
      updateOn: "change",
      validators: [
        passwordMatch(),
      ],
    });
  }

  ngOnInit(): void {
  }

  onSigninSubmit(
    value: SigninFields,
  ) {
    if (this.signinForm.valid) {
      this.isPending = true;
      this.accountService.signin(value).subscribe(
        (response: { status: string }) => {
          this.isPending = false;

          if (response.status === "success") {
            this.router.navigate(["/account/login"]).then(() => {
              this.appService.pushMessage(
                "success",
                "Il tuo account è stato creato, segui le istruzioni ricevute via email",
              );
            });
          } else {
            this.appService.pushMessage(
              "error",
              "Si è verificato un errore durante la richiesta",
            );
          }
        },
      );
    }
  }
}
