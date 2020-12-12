import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SocketConnService} from '../../service/socket-conn.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private route: ActivatedRoute, private SC: SocketConnService) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector('#' + f);
      if (element) {
        element.scrollIntoView();
      }
    });
  }

  getMasterNodeCount(): number {
    const mnc: any = this.SC.masternodecount.getValue();
    if (mnc.enabled) {
      return mnc.enabled;
    }
    return 0;
  }

  getOracleUpdates(select): any {
    if (select === 'a') {
      return 500;
    } else if (select === 'v') {
      return 'k';
    }
  }

  getMasterNodeWeekly(): any {
    return 21.61;
  }

}
