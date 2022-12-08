import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  messages = new Subject<{ type: string; message: string }>();

  constructor() {
  }

  pushMessage(type: string, msg: string) {
    this.messages.next({ type: type, message: msg });
  }
}
