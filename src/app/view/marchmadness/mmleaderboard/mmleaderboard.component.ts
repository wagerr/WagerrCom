import { Component, OnInit } from '@angular/core';
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";

@Component({
  selector: 'app-mmleaderboard',
  templateUrl: './mmleaderboard.component.html',
  styleUrls: ['./mmleaderboard.component.scss']
})
export class MmleaderboardComponent implements OnInit {

  leaderboard = []

  constructor(private wsb: WgrSportsBookService) { }

  ngOnInit(): void {
    this.wsb.marchMadnessLeaderboard.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.leaderboard = data;
      }
    });
    this.wsb.getMarchMadnessLeaderboard();
  }

}
