import { TestBed } from "@angular/core/testing";
import { SettingsService } from "src/app/amministrazione/services/setting.service";

describe("SettingService", () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
