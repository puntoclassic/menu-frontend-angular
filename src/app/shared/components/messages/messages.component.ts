import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { AppService } from "src/app/shared/services/app.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
})
export class MessagesComponent implements OnInit, OnDestroy {
  @HostBinding("class")
  classes: string;
  message?: { type: string; message: string };
  messageStream = new Subscription();

  constructor(private appService: AppService) {
    this.messageStream = this.appService.messages.subscribe(
      (msg) => {
        this.message = msg;
        this.classes = "pt-4 ps-4 pe-4 row g-0";
      },
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.messageStream.unsubscribe();
  }
}
