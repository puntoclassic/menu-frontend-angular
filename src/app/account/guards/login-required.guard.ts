import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { map, Observable } from "rxjs";
import { AccountService } from "src/app/account/services/account.service";
import { AppService } from "src/app/shared/services/app.service";

@Injectable({
  providedIn: "root",
})
export class LoginRequiredGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private appService: AppService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.accountService.userLogged$.pipe(
      map((status) => {
        if (status) {
          return true;
        } else {
          this.router.navigate(["/account/login"], {
            queryParams: {
              backUrl: state.url,
            },
          }).then(() => {
            this.appService.pushMessage(
              "error",
              "Questa pagina richiede l'accesso",
            );
          });
          return false;
        }
      }),
    );
  }
}
