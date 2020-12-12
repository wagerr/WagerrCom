import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';

@Component({
  selector: 'app-sb-add-device-code',
  templateUrl: './sb-add-device-code.component.html',
  styleUrls: ['./sb-add-device-code.component.scss']
})
export class SbAddDeviceCodeComponent implements OnInit, OnDestroy {
  elementType = 'url';
  qrcode = '';
  teamDisplay: any;
  canApprove = false;
  authUser: any;
  constructor(
    private wsb: WgrSportsBookService,
    public bsModalRef: BsModalRef
  ) {
    this.wsb.authorization.subscribe((data: any) => {
      if (data && data.authId) {
        if (data.authId !== this.wsb.authID && !data.degen) {
          this.canApprove = true;
          this.authUser = data;
          this.teamDisplay = JSON.parse(data.msg);
        }
      }
    });
  }
  getTeam(id: number): string {
    const name = this.wsb.getTeamNameFromList(id);
    if (name === '') {
      return 'Winja';
    }
    return name;
  }

  ngOnInit(): void {
    this.wsb.getQrCode();
    this.qrcode = this.wsb.shareQrCode;
  }

  ngOnDestroy(): void {
  }

  disapproveUser(): void {
    this.bsModalRef.hide();
    this.canApprove = false;
    this.wsb.authorization.next([]);
  }

  approveUser(): void {
    this.bsModalRef.hide();
    this.canApprove = false;
    this.authUser.degen = this.wsb.authID;
    this.wsb.approveUser(this.authUser);
  }
}
