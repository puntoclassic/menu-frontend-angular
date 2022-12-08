import { Component, OnInit } from "@angular/core";
import { SettingsService } from "src/app/amministrazione/services/setting.service";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  siteName: string;
  siteSubTitle: string;

  constructor(private settingService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingService.settings.subscribe((data) => {
      this.siteName = data.site_name;
      this.siteSubTitle = data.site_subtitle;
    });
  }
}
