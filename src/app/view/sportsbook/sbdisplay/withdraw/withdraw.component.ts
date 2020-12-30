import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { WgrSportsBookService } from '../../../../service/wgr-sports-book.service';
import { AddressValidatorService } from '../../../../utils';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  balance = 0;
  fee = 0.01;
  withAddr: string;
  subscriptions: Subscription[] = [];
  verifyWithdraw = false;
  withdrawForm = new FormGroup({
    address: new FormControl('', [Validators.required, this.addressValidatorService.validateWgrAddress]),
    amount: new FormControl('', Validators.required),
    fee: new FormControl(this.fee),
    total: new FormControl('0'),
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private wsb: WgrSportsBookService,
    private addressValidatorService: AddressValidatorService
  ) {
    this.wsb.account.subscribe((data: any) => {
      this.balance = data.betBalance;
      this.withAddr = data.betAddress;
    });
  }

  get address(): any { return this.withdrawForm.get('address'); }

  ngOnInit(): void {
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        this.verifyWithdraw = false;
        this.withdrawForm.get('address').setValue('');
        this.withdrawForm.get('amount').setValue('');
        this.withdrawForm.get('total').setValue(0);
        this.unsubscribe();
      })
    );
  }


  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  setMax(): void {
    this.withdrawForm.get('amount').setValue(this.balance);
    this.updateTotal();
  }

  updateTotal(): void {
    const balance = this.withdrawForm.get('amount').value;
    const fee = this.withdrawForm.get('fee').value;
    let update = +balance - +fee;
    if (balance <= 0) {
      update = fee;
    }
    if (update > this.balance) {
      this.withdrawForm.get('amount').setValue(this.balance.toFixed(8));
      update = this.balance - +fee;
    }
    this.withdrawForm.get('total').setValue(update);
  }

  getTotal(): any {
    const total: number = this.withdrawForm.get('total').value;
    const amount: number = (total) ? +total : 0.00000;
    return amount.toFixed(8);
  }

  cancel(): any {
    this.bsModalRef.hide();
  }

  withdraw(): void {
    const address = this.withdrawForm.get('address').value;
    if (address !== this.withAddr) {
      const balance = this.withdrawForm.get('total').value;
      this.wsb.withdraw(balance, address);
    }
    this.cancel();
  }
}
