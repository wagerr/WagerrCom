import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-eurousodds',
  templateUrl: './eurousodds.component.html',
  styleUrls: ['./eurousodds.component.scss']
})
export class EurousoddsComponent implements OnInit {
  @Input() points: number;
  @Input() type = 'euro';

  constructor() {
  }

  ngOnInit(): void {
  }

  usOdds(points: number): string {
    let beforeOdds = 0;
    let odds = 0;
    if (points > 2) {
      beforeOdds = ((points - 1) * 100);
    } else {
      beforeOdds = ((-100) / (points - 1));
    }
    odds = Math.round(beforeOdds);
    let finalOdds: string = odds.toString();
    if (odds > 0) {
      finalOdds = '+' + odds.toString();
    }
    return finalOdds;
  }

}
