import {Component, HostListener, OnInit} from '@angular/core';
import {WgrSportsBookService} from '../../service/wgr-sports-book.service';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {SbAddDeviceCodeComponent} from './sb-add-device-code/sb-add-device-code.component';
import {SbAddDeviceComponent} from './sb-add-device/sb-add-device.component';

@Component({
  selector: 'app-sportsbook',
  templateUrl: './sportsbook.component.html',
  styleUrls: ['./sportsbook.component.scss']
})
export class SportsbookComponent implements OnInit {
  bsModalRef: BsModalRef;
  userActivity;
  userInactive: Subject<any> = new Subject();
  toasts = [
    {
      status: true,
      title: 'Maintenance Update',
      time: 1619456292,
      body: '<p class="p-0 font-roboto-condensed">Wagerr.com is upgrading the web-based sportsbook. The long-term result will be improved compatibility, mobility, and affiliate tracking.</p>' +
        '<p class="p-0 font-roboto-condensed">The process of upgrading has affected the display of some user balances on the website. New accounts are not affected.</p>' +
        '<p class="p-0 font-roboto-condensed">Note that these temporary display issues have no effect on the true account balances on the blockchain. True account balances can be verified on the block explorer. When the upgrade is complete, all balances will display correctly and affected accounts can resume betting on wagerr.com.</p>' +
        '<p class="p-0 font-roboto-condensed">During the upgrade process, users can access their funds and continue betting by using the Wagerr Electrum Betting App or mobile app. Thank you for your patience. </p>'
    }
  ];

  constructor(private wsb: WgrSportsBookService,
              private modalService: BsModalService,
              private route: ActivatedRoute) {
    this.setTimeout();
    this.userInactive.subscribe(() => this.wsb.sourceToggle());
  }

  ngOnInit(): void {
    const addDevice = this.route.snapshot.queryParamMap.get('addDevice');
    if (addDevice) {
      this.openModalAddDevice();
    }
    const refAddress = this.route.snapshot.paramMap.get('refAddress');
    if (refAddress) {
      sessionStorage.setItem('ref', refAddress);
    }
    const gotRefAddress = sessionStorage.getItem('ref');
    if (gotRefAddress) {
    }
    this.wsb.account.subscribe((data: any) => {
    });
  }

  getDate(time: any): any {
    return new Date(time * 1000);
  }

  openModalAddDevice(): void {
    this.bsModalRef = this.modalService.show(SbAddDeviceComponent);
  }

  setTimeout(): void {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), (1 * 60000));
  }

  @HostListener('window:mousemove') refreshUserState(): void {
    clearTimeout(this.userActivity);
    this.wsb.sourceToggle(true);
    this.setTimeout();
  }

}
