import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginRequiredGuard } from "src/app/account/guards/login-required.guard";
import { AccountPageComponent } from "src/app/account/pages/account-page/account-page.component";
import { LoginPageComponent } from "src/app/account/pages/login-page/login-page.component";
import { SigninPageComponent } from "src/app/account/pages/signin-page/signin-page.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ChangePasswordPageComponent } from "src/app/account/pages/change-password-page/change-password-page.component";
import { InformazioniPersonaliPageComponent } from "src/app/account/pages/informazioni-personali-page/informazioni-personali-page.component";
import { ResetPasswordPageComponent } from "src/app/account/pages/reset-password-page/reset-password-page.component";
import { ResetPasswordTokenPageComponent } from "src/app/account/pages/reset-password-token-page/reset-password-token-page.component";
import { VerificaAccountPageComponent } from "src/app/account/pages/verifica-account-page/verifica-account-page.component";
import { VerificaAccountTokenPageComponent } from "src/app/account/pages/verifica-account-token-page/verifica-account-token-page.component";
import { AnonymousRequiredGuard } from "src/app/account/guards/anonymous-required.guard";

const routes: Routes = [
  {
    path: "account",
    children: [
      {
        path: "",
        component: AccountPageComponent,
        canActivate: [LoginRequiredGuard],
        title: "Il mio account",
      },
      {
        path: "login",
        component: LoginPageComponent,
        title: "Accedi",
        canActivate: [AnonymousRequiredGuard],
      },
      { path: "signin", component: SigninPageComponent, title: "Crea account" },
      {
        path: "verificaAccount",
        component: VerificaAccountPageComponent,
        title: "Verifica account",
      },
      {
        path: "verificaAccount/token",
        component: VerificaAccountTokenPageComponent,
        title: "Verifica account",
      },
      {
        path: "resetPassword",
        component: ResetPasswordPageComponent,
        title: "Recupera password",
      },
      {
        path: "resetPassword/token",
        component: ResetPasswordTokenPageComponent,
        title: "Recupera password",
      },
      {
        path: "cambiaPassword",
        component: ChangePasswordPageComponent,
        title: "Cambia password",
        canActivate: [LoginRequiredGuard],
      },
      {
        path: "informazioniPersonali",
        component: InformazioniPersonaliPageComponent,
        title: "Informazioni personali",
        canActivate: [LoginRequiredGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AccountPageComponent,
    ChangePasswordPageComponent,
    InformazioniPersonaliPageComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    ResetPasswordTokenPageComponent,
    SigninPageComponent,
    VerificaAccountPageComponent,
    VerificaAccountTokenPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AccountModule {}
