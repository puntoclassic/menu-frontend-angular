import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { AbstractControl } from "@angular/forms";

import { Chart, registerables } from "chart.js";
import { debounceTime, map } from "rxjs";
import { isThisTypeNode } from "typescript";
Chart.register(...registerables);

@Component({
  selector: "app-grafico",
  templateUrl: "./grafico.component.html",
  styleUrls: ["./grafico.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficoComponent implements OnInit, AfterViewInit, OnChanges {
  constructor() {
  }

  @Input()
  valoriField: AbstractControl;

  ngAfterViewInit(): void {
    var canvas = this.myCanvas.nativeElement as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    this.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.valoriField.value.split(","),
        datasets: [{
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],

          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.valoriField.valueChanges.pipe(
      debounceTime(500),
      map((valore) => {
        this.myChart.data.labels = valore.split(",");
        this.myChart.data.datasets = [{
          label: "Test",
          data: Array(this.myChart.data.labels.length).fill(
            1,
          ).map(() => Math.floor(Math.random() * 10)),
        }];
        this.myChart.update();
      }),
    ).subscribe();
  }

  @ViewChild("myCanvas")
  myCanvas: ElementRef;

  myChart: Chart;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    /*if (this.myChart && changes) {

    }*/
  }
}
