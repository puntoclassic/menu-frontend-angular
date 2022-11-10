import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-filter-tab",
  templateUrl: "./filter-tab.component.html",
  styleUrls: ["./filter-tab.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FilterTabComponent implements OnInit {
  @HostBinding("class")
  classes =
    "p-3 bg-light d-flex flex-grow-1 flex-column rounded rounded-2 shadow-sm";

  @Input()
  orderBy: string;

  @Input()
  columns: any[];

  @Input()
  ascending: boolean;

  @Output()
  ascendingEvent: EventEmitter<boolean> = new EventEmitter();

  @Output()
  orderByEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  onAscendingChange(value) {
    this.ascendingEvent.emit(value);
  }

  onOrderByChange(value) {
    this.orderByEvent.emit(value);
  }
}
