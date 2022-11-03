import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, ReplaySubject } from "rxjs";
import { SettingFields } from "src/app/amministrazione/types";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  settings = new ReplaySubject<SettingFields>(1);

  constructor(
    private http: HttpClient,
  ) {
    this.fetchSettings();
  }

  fetchSettings() {
    this.http.get<[]>("api/admin/setting/").subscribe((data) => {
      var object: SettingFields = Object.assign(
        {},
        ...data.map((x: any) => ({ [x.name]: x.value })),
      );
      this.settings.next(object as SettingFields);
    });
  }

  getSettings() {
    return this.http.get("api/admin/setting/");
  }

  pushSettings(data: SettingFields) {
    return this.http.post("api/admin/setting/", data);
  }
}
