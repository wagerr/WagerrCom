import {Component, Input, OnInit} from '@angular/core';
import {WgrSportsBookService} from "../../../../service/wgr-sports-book.service";

@Component({
  selector: 'app-eurousodds',
  templateUrl: './eurousodds.component.html',
  styleUrls: ['./eurousodds.component.scss']
})
export class EurousoddsComponent implements OnInit {
  @Input() points: number;
  @Input() type = 'euro';

  constructor(private wsb: WgrSportsBookService) {
  }

  ngOnInit(): void {
  }

  usOdds(points: number): string {
    return this.wsb.usOdds(points);
  }

}
