export type FetchCategoryRequest = {
  search?: string;
  perPage?: number;
  page?: number;
  orderBy?: string;
  ascend?: boolean;
  paginated?: boolean;
};

export type FetchFoodRequest = {
  search?: string;
  perPage?: number;
  page?: number;
  orderBy?: string;
  ascend?: boolean;
};

export type FetchOrderStateRequest = {
  search?: string;
  perPage?: number;
  page?: number;
  orderBy?: string;
  ascend?: boolean;
};

export type CreateCategoryData = {
  name: string;
  image?: string;
};

export type UpdateCategoryData = CreateCategoryData;

export type CreateFoodData = {
  id?: number;
  name: string;
  ingredients?: string;
  price: number;
  category_id: number;
};

export type UpdateFoodData = CreateFoodData;

export type CreateOrderStateData = {
  id?: number;
  name: string;
  cssBadgeClass?: string;
};

export type SettingFields = {
  site_name: string;
  site_subtitle: string;
  shipping_costs: number;
  order_created_state_id: number;
  order_paid_state_id: number;
  theme_primary_color: string;
  theme_secondary_color: string;
};

export type UpdateOrderStateData = CreateOrderStateData;
