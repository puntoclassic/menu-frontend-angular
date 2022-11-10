import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/account/services/account.service";
import { ChangePasswordRequest } from "src/app/account/types/formTypes";
import { passwordMatch } from "src/app/account/validators/passwordMatch";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-change-password-page",
  templateUrl: "./change-password-page.component.html",
  styleUrls: ["./change-password-page.component.scss"],
})
export class ChangePasswordPageComponent implements OnInit, OnDestroy {
  isPending: boolean = false;
  form: FormGroup;
  emailControl: AbstractControl;
  oldPasswordControl: AbstractControl;
  newPasswordControl: AbstractControl;
  confirmNewPasswordControl: AbstractControl;
  userSubscription: Subscription;

  constructor(
    private appService: AppService,
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.emailControl = this.formBuilder.control("", {
      updateOn: "change",
      validators: [
        Validators.required,
        Validators.email,
      ],
    });

    this.oldPasswordControl = this.formBuilder.control("", {
      updateOn: "change",
      validators: [
        Validators.required,
      ],
    });

    this.newPasswordControl = this.formBuilder.control("", {
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

    this.confirmNewPasswordControl = this.formBuilder.control("", {
      updateOn: "change",
      validators: [
        Validators.required,
      ],
    });

    const options: AbstractControlOptions = {
      updateOn: "change",
      validators: [
        passwordMatch(),
      ],
    };

    this.form = this.formBuilder.group({
      email: this.emailControl,
      currentPassword: this.oldPasswordControl,
      password: this.newPasswordControl,
      confirmPassword: this.confirmNewPasswordControl,
    }, options);

    this.userSubscription = this.accountService.user$.subscribe((user) => {
      this.emailControl.setValue(user.email);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onFormSubmit(data: ChangePasswordRequest) {
    if (this.form.valid) {
      this.isPending = true;
      this.accountService.changePassword(data).subscribe((result) => {
        this.oldPasswordControl.setErrors({});

        if (result.type === "Success") {
          this.accountService.logout().subscribe(() => {
            this.router.navigate(["/account/login"]).then(() => {
              this.appService.pushMessage(
                "success",
                "Password cambiata con successo",
              );
            });
          });
        } else if (result.type === "Bad old password") {
          this.oldPasswordControl.setErrors({
            badOldPassword: true,
          });
        } else {
          this.appService.pushMessage("error", "Si è verificato un errore");
        }
        this.isPending = false;
      });
    }
  }
}
