import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  CreateOrderStateData,
  FetchOrderStateRequest,
  UpdateOrderStateData,
} from "src/app/amministrazione/types";

@Injectable({
  providedIn: "root",
})
export class OrderStateService {
  constructor(private http: HttpClient) {}

  fetchOrderStates(data: FetchOrderStateRequest) {
    return this.http.post("api/admin/orderState", data);
  }

  getOrderStatesForSelect() {
    return this.http.get("api/admin/orderState");
  }

  getOrderState(id: number) {
    return this.http.get(`api/admin/orderState/${id}`);
  }

  createOrderState(data: CreateOrderStateData) {
    return this.http.post("api/admin/orderState/create", data);
  }

  updateOrderState(data: UpdateOrderStateData) {
    return this.http.post("api/admin/orderState/update", data);
  }

  deleteOrderState(id: number) {
    return this.http.post("api/admin/orderState/delete", { id: id });
  }
}
