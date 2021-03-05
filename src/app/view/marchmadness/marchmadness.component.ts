import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marchmadness',
  templateUrl: './marchmadness.component.html',
  styleUrls: ['./marchmadness.component.scss']
})
export class MarchmadnessComponent implements OnInit {
  loggedin = true;
  brakets = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
