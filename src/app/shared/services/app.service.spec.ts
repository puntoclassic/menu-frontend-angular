import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { fakeCategoryData } from "src/app/test/fakeCategoryData";

import { AppService } from "./app.service";

describe("AppService", () => {
  let service: AppService;

  beforeEach(() => {
    fakeCategoryData();
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
    });

    service = TestBed.inject(AppService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
