import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { fakeAdminAccountData } from "src/app/test/fakeAdminAccountData";
import { fakeCategoryData } from "src/app/test/fakeCategoryData";
import { fakeSettingsData } from "src/app/test/fakeSettingsData";

import { AdminRequiredGuard } from "./admin-required.guard";

describe("AdminRequiredGuard", () => {
  let guard: AdminRequiredGuard;

  beforeEach(() => {
    fakeSettingsData();
    fakeAdminAccountData();

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
    });
    guard = TestBed.inject(AdminRequiredGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
