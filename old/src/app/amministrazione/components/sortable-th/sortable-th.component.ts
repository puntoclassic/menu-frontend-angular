import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "[app-sortable-th]",
  templateUrl: "./sortable-th.component.html",
  styleUrls: ["./sortable-th.component.scss"],
})
export class SortableThComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  column: string;

  @Input()
  orderBy: string;

  @Input()
  ascending: boolean;

  @Output()
  clickEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  onClickEvent() {
    this.clickEvent.emit(this.column);
  }
}
