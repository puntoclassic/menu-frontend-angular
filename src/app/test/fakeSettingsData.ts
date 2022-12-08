import { of } from "rxjs";
import { SettingsService } from "src/app/amministrazione/services/setting.service";

export const fakeSettingsData = () => {
  spyOn(SettingsService.prototype, "getSettings").and.returnValue(
    of([
      { "id": 1, "name": "site_name", "value": "FasullaPizz" },
      { "id": 2, "name": "site_subtitle", "value": "Ristorante Pizzeria" },
      { "id": 3, "name": "shipping_costs", "value": "2" },
      { "id": 4, "name": "order_paid_state_id", "value": "5" },
      { "id": 5, "name": "order_created_state_id", "value": "1" },
      { "id": 6, "name": "theme_primary_color", "value": "#730202" },
      { "id": 7, "name": "theme_secondary_color", "value": "#262626" },
    ]),
  );
};
