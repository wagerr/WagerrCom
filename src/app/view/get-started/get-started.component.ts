import {Component, OnInit} from '@angular/core';
import {SocketConnService} from '../../service/socket-conn.service';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
  providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: true}}]
})
export class GetStartedComponent implements OnInit {
  walletInfo: any;
  selectOs = 'win';

  constructor(private SC: SocketConnService) {
  }

  ngOnInit(): void {
    this.SC.walletInfo.subscribe((data: any) => {
      this.walletInfo = data;
    });
    this.selectOs = this.whatOS();
  }

  getWalletInfo(type: string): string {
    return (this.walletInfo && this.walletInfo[type]) ? this.walletInfo[type] : '';
  }

  whatOS(): string {
    let Name = '';
    if (navigator.userAgent.indexOf('Win') !== -1) {
      Name = 'win';
    }
    if (navigator.userAgent.indexOf('Mac') !== -1) {
      Name = 'mac';
    }
    if (navigator.userAgent.indexOf('Linux') !== -1) {
      Name = 'linux';
    }
    if (navigator.userAgent.indexOf('Android') !== -1) {
      Name = 'android';
    }
    if (navigator.userAgent.indexOf('like Mac') !== -1) {
      Name = 'ios';
    }
    return Name;
  }

  selectOS(type: string): void {
    this.selectOs = type;
  }

}
