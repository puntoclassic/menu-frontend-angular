import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { AccountService } from "src/app/account/services/account.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-verifica-account-token-page",
  templateUrl: "./verifica-account-token-page.component.html",
  styleUrls: ["./verifica-account-token-page.component.scss"],
})
export class VerificaAccountTokenPageComponent implements OnInit {
  token?: string;

  constructor(
    private accountService: AccountService,
    private appService: AppService,
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) {
    this.currentRoute.queryParams.subscribe((params: Params) => {
      this.token = params.token;
    });
  }

  ngOnInit(): void {
    if (this.token) {
      this.accountService.activateAccount(this.token).subscribe(
        (value: boolean) => {
          this.router.navigate(["/account/login"]).then(() => {
            if (value) {
              this.appService.pushMessage("success", "Il tuo account è attivo");
            } else {
              this.appService.pushMessage("error", "Richiesta non valida");
            }
          });
        },
      );
    } else {
      this.router.navigate(["/account/login"]).then(() => {
        this.appService.pushMessage("error", "Richiesta non valida");
      });
    }
  }
}
