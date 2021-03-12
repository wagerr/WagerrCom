import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mmleaderboard',
  templateUrl: './mmleaderboard.component.html',
  styleUrls: ['./mmleaderboard.component.scss']
})
export class MmleaderboardComponent implements OnInit {

  leaderboard = [
    {
      rank: 1,
      screenname: 'user',
      points: 12
    },
    {
      rank: 2,
      screenname: 'user',
      points: 12
    },
    {
      rank: 3,
      screenname: 'user',
      points: 12
    },
    {
      rank: 4,
      screenname: 'user',
      points: 12
    },
    {
      rank: 5,
      screenname: 'user',
      points: 12
    },
    {
      rank: 6,
      screenname: 'user',
      points: 12
    },
    {
      rank: 7,
      screenname: 'user',
      points: 12
    },
    {
      rank: 8,
      screenname: 'user',
      points: 12
    },
    {
      rank: 9,
      screenname: 'user',
      points: 12
    },
    {
      rank: 10,
      screenname: 'user',
      points: 12
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
