import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AbstractControl, FormBuilder } from "@angular/forms";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  valore: string = "Ciao mondo";

  valori: string = "Red,Blue,Yellow,Green,Purple,Orange";

  valoriField: AbstractControl;

  constructor(private formBuilder: FormBuilder) {
    this.valoriField = this.formBuilder.control(
      "Catania,Palermo,Siracusa,Messina,Enna",
    );
  }

  ngOnInit(): void {
  }
}
