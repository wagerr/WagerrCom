import {Component, HostListener, OnInit} from '@angular/core';
import {WgrSportsBookService} from '../../service/wgr-sports-book.service';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {SbAddDeviceCodeComponent} from './sb-add-device-code/sb-add-device-code.component';
import {SbAddDeviceComponent} from './sb-add-device/sb-add-device.component';
import {SocketConnService} from "../../service/socket-conn.service";

@Component({
  selector: 'app-sportsbook',
  templateUrl: './sportsbook.component.html',
  styleUrls: ['./sportsbook.component.scss']
})
export class SportsbookComponent implements OnInit {
  bsModalRef: BsModalRef;
  userActivity;
  userInactive: Subject<any> = new Subject();
  toasts = [];

  constructor(private wsb: WgrSportsBookService,
              private modalService: BsModalService,
              private socketService: SocketConnService,
              private route: ActivatedRoute) {
    this.setTimeout();
    this.userInactive.subscribe(() => this.wsb.sourceToggle());
  }

  ngOnInit(): void {
    this.socketService.toastAll.subscribe((gotData: any) => {
      this.toasts = gotData;
    });
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
