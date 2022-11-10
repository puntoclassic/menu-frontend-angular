import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { AccountService } from "src/app/account/services/account.service";
import { AppService } from "src/app/shared/services/app.service";

@Injectable({
  providedIn: "root",
})
export class AnonymousRequiredGuard implements CanActivate {
  userIsLogged: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private appService: AppService,
  ) {
    this.accountService.userLogged$.subscribe((logged) => {
      this.userIsLogged = logged;
    });
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
          this.router.navigate(["/account"]);
          return false;
        } else {
          return true;
        }
      }),
    );

    /**
     * VERIFICA VIA SERVER SE L'UTENTE NON HA EFFETTUATO ACCESSO

    return this.accountService.getAccountState().pipe(
      map(() => {
        this.router.navigate(["/account"]);
        return false;
      }),
      catchError(() => {
        return of(true);
      }),
    );
     */
  }
}
