import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";

import { SharedModule } from "src/app/shared/shared.module";
import { CategoryListPageComponent } from "./pages/categorie/category-list-page/category-list-page.component";
import { CategoryCreatePageComponent } from "./pages/categorie/category-create-page/category-create-page.component";
import { CategoryEditPageComponent } from "./pages/categorie/category-edit-page/category-edit-page.component";
import { CategoryDeletePageComponent } from "./pages/categorie/category-delete-page/category-delete-page.component";
import { FoodListPageComponent } from "./pages/cibi/food-list-page/food-list-page.component";
import { FoodEditPageComponent } from "./pages/cibi/food-edit-page/food-edit-page.component";
import { FoodCreatePageComponent } from "./pages/cibi/food-create-page/food-create-page.component";
import { FoodDeletePageComponent } from "./pages/cibi/food-delete-page/food-delete-page.component";
import { PaginatorComponent } from "./components/paginator/paginator.component";
import { PerPageSelectorComponent } from "./components/per-page-selector/per-page-selector.component";
import { AdminRequiredGuard } from "src/app/account/guards/admin-required.guard";
import { CategoryRowComponent } from "src/app/amministrazione/pages/categorie/components/category-row/category-row.component";
import { AdminSearchFormComponent } from "./components/admin-search-form/admin-search-form.component";
import { SortableThComponent } from "./components/sortable-th/sortable-th.component";
import { FoodRowComponent } from "src/app/amministrazione/pages/cibi/components/food-row/food-row.component";
import { OrderStateListPageComponent } from "./pages/orderState/order-state-list-page/order-state-list-page.component";
import { OrderStateCreatePageComponent } from "./pages/orderState/order-state-create-page/order-state-create-page.component";
import { OrderStateEditPageComponent } from "./pages/orderState/order-state-edit-page/order-state-edit-page.component";
import { OrderStateDeletePageComponent } from "./pages/orderState/order-state-delete-page/order-state-delete-page.component";
import { OrderStateRowComponent } from "./pages/orderState/components/order-state-row/order-state-row.component";
import { FilterTabComponent } from "./components/filter-tab/filter-tab.component";
import { ImpostazioniGeneraliPageComponent } from "./pages/impostazioni-generali-page/impostazioni-generali-page.component";

const routes: Routes = [
  {
    path: "amministrazione",
    canActivate: [
      AdminRequiredGuard,
    ],
    children: [
      {
        path: "categorie",
        children: [
          {
            path: "",
            component: CategoryListPageComponent,
            title: "Categorie",
          },
          {
            path: "crea",
            component: CategoryCreatePageComponent,
            title: "Crea categoria",
          },
          {
            path: "modifica/:id",
            component: CategoryEditPageComponent,
            title: "Modifica categoria",
          },
          {
            path: "elimina/:id",
            component: CategoryDeletePageComponent,
            title: "Elimina categoria",
          },
        ],
      },
      {
        path: "cibi",
        children: [
          {
            path: "",
            component: FoodListPageComponent,
            title: "Categorie",
          },
          {
            path: "crea",
            component: FoodCreatePageComponent,
            title: "Crea cibo",
          },
          {
            path: "modifica/:id",
            component: FoodEditPageComponent,
            title: "Modifica cibo",
          },
          {
            path: "elimina/:id",
            component: FoodDeletePageComponent,
            title: "Elimina cibo",
          },
        ],
      },
      {
        path: "ordini",
        children: [],
      },
      {
        path: "clienti",
        children: [],
      },
      {
        path: "impostazioni",
        children: [
          {
            path: "generali",
            component: ImpostazioniGeneraliPageComponent,
            title: "Impostazioni generali",
          },
          {
            path: "statiOrdine",
            children: [
              {
                path: "",
                component: OrderStateListPageComponent,
                title: "Stati ordine",
              },
              {
                path: "crea",
                component: OrderStateCreatePageComponent,
                title: "Crea stato ordine",
              },
              {
                path: "modifica/:id",
                component: OrderStateEditPageComponent,
                title: "Modifica stato ordine",
              },
              {
                path: "elimina/:id",
                component: OrderStateDeletePageComponent,
                title: "Elimina stato ordine",
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    CategoryListPageComponent,
    CategoryCreatePageComponent,
    CategoryEditPageComponent,
    CategoryDeletePageComponent,
    FoodListPageComponent,
    FoodEditPageComponent,
    FoodCreatePageComponent,
    FoodDeletePageComponent,
    PaginatorComponent,
    PerPageSelectorComponent,
    CategoryRowComponent,
    AdminSearchFormComponent,
    SortableThComponent,
    FoodRowComponent,
    OrderStateListPageComponent,
    OrderStateCreatePageComponent,
    OrderStateEditPageComponent,
    OrderStateDeletePageComponent,
    OrderStateRowComponent,
    FilterTabComponent,
    ImpostazioniGeneraliPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AmministrazioneModule {}
