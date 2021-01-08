import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-homespread',
  templateUrl: './homespread.component.html',
  styleUrls: ['./homespread.component.scss']
})
export class HomespreadComponent implements OnInit {
  @Input() odds: any;
  constructor() { }

  ngOnInit(): void {
  }
  updateTrueOdds(amt: number): number {
    return 1 + (amt - 1) * 0.94;
  }

  spreadLine(type: any, spreadPoints: number) {
    let points = 0;
    if (type.toLowerCase() === 'away') {
      points = ( (spreadPoints / 100) * -1);
    } else {
      points = (spreadPoints / 100);
    }
    if (points > 0) {
      return '+' + points;
    }
    return points;
  }

}
