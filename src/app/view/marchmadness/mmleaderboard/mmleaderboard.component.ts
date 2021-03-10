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
      screenname: 'kevinsucks',
      points: 12
    },
    {
      rank: 2,
      screenname: 'kevinsucks',
      points: 12
    },
    {
      rank: 3,
      screenname: 'kevinsucks',
      points: 12
    },
    {
      rank: 4,
      screenname: 'kevinsucks',
      points: 12
    },
    {
      rank: 5,
      screenname: 'kevinsucks',
      points: 12
    },
    {
      rank: 6,
      screenname: 'kevinsucks',
      points: 12
    },
    {
      rank: 7,
      screenname: 'kevinsucks',
      points: 12
    },
    {
      rank: 8,
      screenname: 'kevinsucks',
      points: 12
    },
    {
      rank: 9,
      screenname: 'kevinsucks',
      points: 12
    },
    {
      rank: 10,
      screenname: 'kevinsucks',
      points: 12
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
