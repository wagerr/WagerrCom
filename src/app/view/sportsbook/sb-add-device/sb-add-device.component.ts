import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../../service/auth.service';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sb-add-device',
  templateUrl: './sb-add-device.component.html',
  styleUrls: ['./sb-add-device.component.scss']
})
export class SbAddDeviceComponent implements OnInit {
  scanner: ZXingScannerComponent;
  count = 0;
  scandata: any = {
    data: '',
    channel: ''
  };
  room: string;
  changeCamera = false;
  teamDisplay: any;
  scannerEnabled = true;
  availableDevices: MediaDeviceInfo[];
  deviceList: any;
  currentDevice: MediaDeviceInfo = null;
  allDevices: any;

  constructor(
    private cookieService: CookieService,
    public authService: AuthService,
    private wsb: WgrSportsBookService,
    public bsModalRef: BsModalRef,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const addDevice = this.route.snapshot.queryParamMap.get('addDevice');
    if (addDevice) {
      this.scannerEnabled = false;
      this.processQrCode(addDevice);
    } else {
      this.scannerEnabled = true;
    }
    this.wsb.authorization.subscribe((data: any) => {
      if (data && data.authId) {
        if (data.authId === this.wsb.authID && data.degen) {
          this.scandata.channel = 'gotData';
          const decode = this.wsb.decryptData(this.scandata.data, data.degen);
          this.scandata.channel = decode;
          this.setSeedCookie(decode.replace(/\s+$/, ''));
          // this.sc.getSportBookAccountLogin(sendWords);
          this.wsb.getMnemonicData(decode.replace(/\s+$/, ''));
          this.wsb.cancelListen('user-' + this.wsb.decryptData(data.room));
          this.scandata = [];
          this.bsModalRef.hide();
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

  updateCamera(id: any): void {
    if (id !== 'none') {
      this.currentDevice = this.allDevices[id];
    }
  }

  setSeedCookie(seedWords): void {
    this.cookieService.set('asdfl3k-12u9clkjaslj', this.wsb.encryptData(seedWords, this.authService.userID + environment.seasalt), 1825);
  }

  cancel(): void {
    this.scandata = [];
    this.bsModalRef.hide();
  }

  scanSuccessHandler(event: any): void {
    const line = event.split('addDevice=');
    if (line && line[1]) {
      this.processQrCode(line[1]);
    }
  }

  processQrCode(event: any): void {
    const eventAll = event.split(' ').join('+');
    const arr = [];
    while (arr.length < 4) {
      const r = Math.floor(Math.random() * 63) + 1;
      if (arr.indexOf(r) === -1) {
        arr.push(r);
      }
    }
    this.teamDisplay = arr;
    this.scannerEnabled = false;
    const data: any = JSON.parse(this.wsb.decryptData(eventAll, environment.seasaltsecond));
    this.scandata.data = data.sdf383nl1239;
    const channel = this.wsb.decryptData(data.winjaOne);
    this.wsb.getAuthorization(channel, JSON.stringify(arr));

  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.deviceList = this.availableDevices;
    this.setCamera(this.availableDevices);
  }

  setCamera(devices: any): void {
    setTimeout(() => {
      this.allDevices = devices;
      this.count = devices.length;
      this.currentDevice = devices[devices.length - 1];
    }, 100);

  }
}
