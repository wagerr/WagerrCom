import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mmsplash',
  templateUrl: './mmsplash.component.html',
  styleUrls: ['./mmsplash.component.scss']
})
export class MmsplashComponent implements OnInit {
  leaderboard = false;
  loggedin = true;
  createBracket = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleLeaderBoard() {
    this.leaderboard = !this.leaderboard;
  }
  toggleCreateBracket() {
    this.createBracket = !this.createBracket;
  }
}
