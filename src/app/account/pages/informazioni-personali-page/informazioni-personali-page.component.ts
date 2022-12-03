import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/account/services/account.service";
import { PersonalInfoUpdateRequest } from "src/app/account/types/formTypes";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-informazioni-personali-page",
  templateUrl: "./informazioni-personali-page.component.html",
  styleUrls: ["./informazioni-personali-page.component.scss"],
})
export class InformazioniPersonaliPageComponent implements OnInit, OnDestroy {
  isPending: boolean = false;
  form: FormGroup;
  firstnameControl: AbstractControl;
  lastnameControl: AbstractControl;
  userSubscription: Subscription;

  constructor(
    private accountService: AccountService,
    private appService: AppService,
    private formBuilder: FormBuilder,
  ) {
    this.firstnameControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
        Validators.pattern(RegExp("^[a-zA-Z]")),
      ],
    });

    this.lastnameControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
        Validators.pattern(RegExp("^[a-zA-Z]")),
      ],
    });

    this.form = this.formBuilder.group({
      firstname: this.firstnameControl,
      lastname: this.lastnameControl,
    });

    this.userSubscription = this.accountService.user$.subscribe((user) => {
      this.firstnameControl.setValue(user.firstname);
      this.lastnameControl.setValue(user.lastname);
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  onFormSubmit(data: PersonalInfoUpdateRequest) {
    if (this.form.valid) {
      this.isPending = true;
      this.accountService.updatePersonalInfo(data).subscribe(
        (response) => {
          if (response) {
            this.appService.pushMessage(
              "success",
              "Informazioni aggiornate con successo",
            );
            this.accountService.loadAccountState();
          } else {
            this.appService.pushMessage(
              "error",
              "Impossibile aggiornare le informazioni",
            );
          }
          this.isPending = false;
        },
      );
    }
  }
}
