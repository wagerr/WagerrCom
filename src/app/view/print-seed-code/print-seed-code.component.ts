import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-seed-code',
  templateUrl: './print-seed-code.component.html',
  styleUrls: ['./print-seed-code.component.scss']
})
export class PrintSeedCodeComponent implements OnInit {
  @Input() seed: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
