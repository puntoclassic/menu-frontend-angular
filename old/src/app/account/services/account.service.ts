import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import {
  ChangePasswordRequest,
  PersonalInfoUpdateRequest,
  ResetPasswordWithTokenRequest,
  SigninFields,
} from "src/app/account/types/formTypes";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  user$ = new ReplaySubject<any>(1);
  userLogged$ = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {
    this.loadAccountState();
  }

  loadAccountState() {
    var user$ = this.user$;
    var userLogged$ = this.userLogged$;
    try {
      this.getAccountState().subscribe({
        error(err) {
          user$.next(null);
          userLogged$.next(false);
        },
        next(value) {
          user$.next(value);
          userLogged$.next(true);
        },
      });
    } catch (err) {
    }
  }

  getAccountState() {
    return this.http.get("api/account/status");
  }

  emailIsBusy(email: string): Observable<boolean> {
    return new Observable((emitter) => {
      if (email != "") {
        this.http.post<any>("api/account/emailIsBusy", {
          email: email,
        }).subscribe((response) => {
          emitter.next(response.status !== "Email free");
          emitter.complete();
        });
      } else {
        emitter.next(false);
        emitter.complete();
      }
    });
  }

  login(
    email: string,
    password: string,
  ): Observable<{ status: string; verified?: boolean; user?: any }> {
    var userLogged = this.userLogged$;
    var user$ = this.user$;
    return new Observable((emitter) => {
      this.http.post<{ token?: string }>("api/account/login", {
        email: email,
        password: password,
      })
        .subscribe({
          next(value) {
            var { token } = value;
            var user: any = jwt_decode(token);

            if (user.verified) {
              //login ok
              user$.next(user);
              emitter.next({
                status: "success",
                verified: true,
                user: user,
              });
              userLogged.next(true);
            } else {
              emitter.next({
                status: "success",
                verified: false,
              });

              userLogged.next(false);
            }
            emitter.complete();
          },
          error(err) {
            emitter.next({
              status: "failed",
            });
            userLogged.next(false);

            emitter.complete();
          },
        });
    });
  }

  signin(data: SigninFields): Observable<{ status: string }> {
    data.source = "web";
    return new Observable((emitter) => {
      this.http.post("api/account/signin", data).subscribe({
        error(err) {
          emitter.next({
            status: "fail",
          });
        },
        next(value) {
          emitter.next({
            status: "success",
          });
        },
      });
    });
  }

  logout(): Observable<boolean> {
    return new Observable((emitter) => {
      this.http.get("api/account/logout").subscribe(() => {
        this.user$.next(null);
        this.userLogged$.next(false);
        emitter.next(true);
        emitter.complete();
      });
    });
  }

  resendActivationEmail(email: string) {
    return new Observable((emitter) => {
      this.http.post("api/account/resend-activation-email", {
        email: email,
        source: "web",
      })
        .subscribe(() => {
          emitter.next(true);
          emitter.complete();
        });
    });
  }

  activateAccount(token: string): Observable<boolean> {
    return new Observable((emitter) => {
      this.http.post("api/account/activateAccount", {
        token: token,
      })
        .subscribe({
          error(err) {
            emitter.next(false);
            emitter.complete();
          },
          next(value) {
            emitter.next(true);
            emitter.complete();
          },
        });
    });
  }

  resetPasswordEmail(email: string): Observable<boolean> {
    return new Observable((emitter) => {
      this.http.post("api/account/resetPassword", {
        email: email,
        source: "web",
      })
        .subscribe(() => {
          emitter.next(true);
          emitter.complete();
        });
    });
  }

  resetPasswordWithToken(
    data: ResetPasswordWithTokenRequest,
  ): Observable<boolean> {
    return new Observable((emitter) => {
      this.http.post("api/account/updatePasswordByToken", data)
        .subscribe({
          error(err) {
            emitter.next(false);
            emitter.complete();
          },
          next(value) {
            emitter.next(true);
            emitter.complete();
          },
        });
    });
  }

  changePassword(data: ChangePasswordRequest): Observable<{ type: string }> {
    return new Observable((emitter) => {
      this.http.post<HttpResponse<any>>("api/account/updatePassword", data)
        .subscribe({
          error(err: HttpResponse<any>) {
            emitter.next({
              type: err.status == 403 ? "Bad old password" : "Bad request",
            });

            emitter.complete();
          },
          next(value) {
            emitter.next({
              type: "Success",
            });
            emitter.complete();
          },
        });
    });
  }

  updatePersonalInfo(data: PersonalInfoUpdateRequest) {
    return new Observable((emitter) => {
      this.http.post("api/account/updatePersonalInfo", data)
        .subscribe({
          error(err) {
            emitter.next(false);
            emitter.complete();
          },
          next(value) {
            emitter.next(true);
            emitter.complete();
          },
        });
    });
  }
}
