import { Component, OnInit } from '@angular/core';
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";

@Component({
  selector: 'app-affiliate-dashboard',
  templateUrl: './affiliate-dashboard.component.html',
  styleUrls: ['./affiliate-dashboard.component.scss']
})
export class AffiliateDashboardComponent implements OnInit {
  isTop = true;
  refData: any;

  constructor(private SB: WgrSportsBookService) { }

  ngOnInit(): void {
    this.SB.account.subscribe((resolve: any) => {
      if (resolve && resolve.refData) {
        this.refData = resolve.refData;
      }
    })
  }

  whatOS(): string {
    let Name = '';
    if (navigator.userAgent.indexOf('Win') !== -1) {
      Name =
        'desktop';
    }
    if (navigator.userAgent.indexOf('Mac') !== -1) {
      Name =
        'desktop';
    }
    if (navigator.userAgent.indexOf('Linux') !== -1) {
      Name =
        'desktop';
    }
    if (navigator.userAgent.indexOf('Android') !== -1) {
      Name =
        'mobile';
      this.isTop = false;
    }
    if (navigator.userAgent.indexOf('like Mac') !== -1) {
      Name =
        'mobile';
      this.isTop = false;
    }
    return Name;
  }
}
