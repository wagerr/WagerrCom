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
}
