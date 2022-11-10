import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  ChildrenOutletContexts,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/account/services/account.service";
import { SettingsService } from "src/app/amministrazione/services/setting.service";
import { SettingFields } from "src/app/amministrazione/types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = "course";
  userServiceReady: boolean = false;

  constructor(
    public translate: TranslateService,
    private accountService: AccountService,
    private settingsService: SettingsService,
    private router: Router,
  ) {
    // Register translation languages
    translate.addLangs(["en", "it"]);
    // Set default language
    translate.setDefaultLang("it");

    this.accountService.userLogged$.subscribe((status) => {
      this.userServiceReady = status != null;
    });

    this.settingsService.settings.subscribe((status: SettingFields) => {
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        this.convertToRGB(status.theme_primary_color),
      );

      document.documentElement.style.setProperty(
        "--bs-secondary-rgb",
        this.convertToRGB(status.theme_secondary_color),
      );

      document.documentElement.style.setProperty(
        "--bs-link-color",
        this.convertToRGB(status.theme_secondary_color),
      );
    });
  }

  ngOnInit() {
    // Se si vuole che ad ogni click su un link la vista venga ricreata
    /*this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };*/
  }

  convertToRGB = function (value: string) {
    if (value.length != 6) {
      value = value.substring(1, value.length);
    }
    var aRgbHex = value.match(/.{1,2}/g);
    var aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16),
    ];
    return aRgb.join(",");
  };
}
