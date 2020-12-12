import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hometotals',
  templateUrl: './hometotals.component.html',
  styleUrls: ['./hometotals.component.scss']
})
export class HometotalsComponent implements OnInit {
  @Input() odds: any;

  constructor() { }

  ngOnInit(): void {
  }
  updateTrueOdds(amt: number): number {
    return 1 + (amt - 1) * 0.94;
  }
}
