import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AccountService } from "src/app/account/services/account.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  isPending: boolean;
  loginForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private accountService: AccountService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = formBuilder.group({
      "backUrl": [],
      "email": [
        "",
        Validators.compose([
          Validators.required,
        ]),
      ],
      "password": ["", Validators.required],
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.loginForm.controls["backUrl"].setValue(params?.backUrl ?? null);
    });
  }

  ngOnInit(): void {
  }

  onLoginSubmit(value: { email: string; password: string; backUrl?: string }) {
    if (this.loginForm.valid) {
      this.isPending = true;
      this.accountService.login(value.email, value.password).subscribe(
        (data: any) => {
          switch (data.status) {
            case "success":
              if (data.verified) {
                const { user } = data;
                if (value.backUrl) {
                  this.router.navigate([value.backUrl]);
                } else {
                  this.router.navigate(["/account"]).then(() => {
                    this.appService.pushMessage(
                      "success",
                      `Bentornato ${user.firstname} ${user.lastname}`,
                    );
                  });
                }
              } else {
                this.appService.pushMessage(
                  "info",
                  "Il tuo account non è attivo",
                );
              }
              break;
            case "failed":
              this.appService.pushMessage(
                "error",
                "Accesso negato",
              );
              break;
          }
          this.isPending = false;
        },
      );
      this.isPending = false;
    }
  }
}
