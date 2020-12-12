import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-test-teamlogo',
  templateUrl: './test-teamlogo.component.html',
  styleUrls: ['./test-teamlogo.component.scss']
})
export class TestTeamlogoComponent implements OnInit {
  selectedId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('team');
  }

}
