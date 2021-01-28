import { Component, OnInit, Input } from '@angular/core';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent implements OnInit {
  @Input() modal = true;
  didCopy = false;
  hostname = window.location.hostname;
  refUrl: string;
  userID: string;

  constructor(
    private wsb: WgrSportsBookService,
    public bsModalRef: BsModalRef) {
    this.wsb.account.subscribe((accountData: any) => {
      if (accountData && accountData.uid) {
        this.userID = accountData.uid;
      }
    });

  }

  ngOnInit(): void {
    this.didCopy = false;
  }

  getUserBetAddress(): string {
     return 'https://' + this.hostname + '/sb/ref/' + this.userID;
  }

  copyMessage(val: string): void {
    this.didCopy = true;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
