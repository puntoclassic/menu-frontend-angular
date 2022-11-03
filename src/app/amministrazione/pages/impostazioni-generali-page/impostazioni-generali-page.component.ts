import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { catchError, map, Subscription, throwError } from "rxjs";
import { OrderStateService } from "src/app/amministrazione/services/order-state.service";
import { SettingsService } from "src/app/amministrazione/services/setting.service";
import { SettingFields } from "src/app/amministrazione/types";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-impostazioni-generali-page",
  templateUrl: "./impostazioni-generali-page.component.html",
  styleUrls: ["./impostazioni-generali-page.component.scss"],
})
export class ImpostazioniGeneraliPageComponent implements OnInit, OnDestroy {
  form: FormGroup;

  //FORM CONTROLS
  siteNameControl: AbstractControl;
  siteSubtitleControl: AbstractControl;
  shippingCostsControl: AbstractControl;
  orderCreatedStateControl: AbstractControl;
  orderPaidStateControl: AbstractControl;
  primaryColorControl: AbstractControl;
  secondaryColorControl: AbstractControl;

  orderStates: any[];
  currentSettingSubscription: Subscription;
  isPending: boolean = false;

  constructor(
    private settingService: SettingsService,
    private formBuilder: FormBuilder,
    private orderStateService: OrderStateService,
    private appService: AppService,
  ) {
    this.siteNameControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
      ],
    });

    this.siteSubtitleControl = this.formBuilder.control("");

    this.shippingCostsControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
        Validators.pattern(
          "\\d{1,3}[,.]?(\\d{1,2})?",
        ),
      ],
    });

    this.orderCreatedStateControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
      ],
    });

    this.orderPaidStateControl = this.formBuilder.control("", {
      validators: [
        Validators.required,
      ],
    });

    this.primaryColorControl = this.formBuilder.control("115, 2, 2", {
      validators: [
        Validators.required,
      ],
    });

    this.secondaryColorControl = this.formBuilder.control("33, 37, 41", {
      validators: [
        Validators.required,
      ],
    });

    this.form = this.formBuilder.group({
      site_name: this.siteNameControl,
      site_subtitle: this.siteSubtitleControl,
      shipping_costs: this.shippingCostsControl,
      order_created_state_id: this.orderCreatedStateControl,
      order_paid_state_id: this.orderPaidStateControl,
      theme_primary_color: this.primaryColorControl,
      theme_secondary_color: this.secondaryColorControl,
    });

    this.currentSettingSubscription = this.settingService.settings.pipe(
      map((result: SettingFields) => {
        this.siteNameControl.setValue(result.site_name);
        this.siteSubtitleControl.setValue(result.site_subtitle);
        this.shippingCostsControl.setValue(
          result.shipping_costs,
        );
        this.orderCreatedStateControl.setValue(result.order_created_state_id);
        this.orderPaidStateControl.setValue(result.order_paid_state_id);
        this.primaryColorControl.setValue(
          result.theme_primary_color || this.primaryColorControl.value,
        );
        this.secondaryColorControl.setValue(
          result.theme_secondary_color || this.secondaryColorControl.value,
        );
      }),
    ).subscribe();

    this.orderStateService.getOrderStatesForSelect().pipe(
      map((result: any[]) => {
        this.orderStates = result;
      }),
    ).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.currentSettingSubscription.unsubscribe();
  }

  onSubmit(data: SettingFields) {
    if (this.form.valid) {
      this.settingService.pushSettings(data).pipe(
        map(() => {
          this.isPending = false;
          this.appService.pushMessage(
            "success",
            "Impostazioni aggiornate con successo",
          );
          this.settingService.fetchSettings();
        }),
        catchError(() => {
          this.isPending = false;
          this.appService.pushMessage("error", "Si è verificato un errore");
          return throwError(() => new Error("badRequest"));
        }),
      ).subscribe();
    }
  }
}
