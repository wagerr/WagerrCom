import {Component, OnInit, Input} from '@angular/core';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {SocketConnService} from '../../../service/socket-conn.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-sbbalance',
  templateUrl: './sbbalance.component.html',
  styleUrls: ['./sbbalance.component.scss']
})
export class SbbalanceComponent implements OnInit {
  @Input() topBar: boolean;
  txlist: any;
  unspentBalance = 0;
  balance = 0;
  preBalance = 0;
  winBalance = 0;
  isTestnet = environment[environment.access].testnet;

  constructor(private wsb: WgrSportsBookService) {
    this.wsb.processAvailableBalance();
    this.wsb.getAddressData();
  }

  ngOnInit(): void {
    this.wsb.account.subscribe((data: any) => {
      this.balance = data.betBalance;
      this.preBalance = data.depBalance;
    });
    this.wsb.transactionList.subscribe((response: any) => {
      this.winBalance = 0;
      this.txlist = response;
      this.txlist.forEach((tx: any) => {
        if (tx.type.toLowerCase() === 'betpayout') {
          const txConfirms = this.wsb.blockheight - tx.height;
          if (txConfirms < 100) {
            this.winBalance += tx.value;
          }
        }
      });
    });
  }

  getWinBal(id: number): any {
    const bal = this.winBalance.toString();
    const sBal = bal.split('.');
    return (sBal[id]) ? sBal[id] : '000000';
  }

  getBal(id: number): any {
    const bal = this.balance.toString();
    const sBal = bal.split('.');
    return (sBal[id]) ? sBal[id] : '000000';
  }

  getPreBal(id: number): any {
    const bal = this.preBalance.toString();
    const sBal = bal.split('.');
    return (sBal[id]) ? sBal[id] : '000000';
  }

}
