import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {WgrSportsBookService} from '../../../../service/wgr-sports-book.service';
import {LogoutModalComponent} from '../../logout-modal/logout-modal.component';
import {BuyModalComponent} from '../../../buy-modal/buy-modal.component';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  elementType = 'url';
  didCopy = false;

  constructor(
    private wsb: WgrSportsBookService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.didCopy = false;
  }

  openModalBuyNow(): void {
    this.bsModalRef.hide();
    this.bsModalRef = this.modalService.show(BuyModalComponent,
      Object.assign({}, { }));
  }

  getUserBetAddress(): string {
    return this.wsb.getUserBetAddress();
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
