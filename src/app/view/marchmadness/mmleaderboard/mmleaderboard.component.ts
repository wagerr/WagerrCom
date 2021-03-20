import { Component, OnInit } from '@angular/core';
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";

@Component({
  selector: 'app-mmleaderboard',
  templateUrl: './mmleaderboard.component.html',
  styleUrls: ['./mmleaderboard.component.scss']
})
export class MmleaderboardComponent implements OnInit {
  lastPoints = 0;
  lastRank = 1;
  leaderboard = []

  constructor(private wsb: WgrSportsBookService) { }

  ngOnInit(): void {
    this.wsb.marchMadnessLeaderboard.subscribe((data: any) => {
      if (data && data.length > 0) {
        let lastPoints = 0;
        let lastRank = 0;
        data.forEach((each: any) => {
          let pts = each.points;
          if (pts === lastPoints) {
            each.rank = lastRank;
          } else {
            lastRank += 1;
            lastPoints = each.points;
            each.rank = lastRank;
          }
          this.leaderboard.push(each);
        });
      }
    });
    this.wsb.getMarchMadnessLeaderboard();
  }

  toggleViewBracket(hash: string): void {
    this.wsb.getMarchMadnessBracketFromHash(hash);

}
}
