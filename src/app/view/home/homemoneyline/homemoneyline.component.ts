import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-homemoneyline',
  templateUrl: './homemoneyline.component.html',
  styleUrls: ['./homemoneyline.component.scss']
})
export class HomemoneylineComponent implements OnInit {
  @Input() odds: any;

  constructor() { }

  ngOnInit(): void {
  }
  updateTrueOdds(amt: number): number {
    return 1 + (amt - 1) * 0.94;
  }

  isThreeWay(amt: number): boolean {
    return (amt > 0);
  }

}
