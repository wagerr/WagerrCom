import { Component, OnInit } from '@angular/core';
import {SocketConnService} from '../../../service/socket-conn.service';

@Component({
  selector: 'app-sbbetabook',
  templateUrl: './sbbetabook.component.html',
  styleUrls: ['./sbbetabook.component.scss']
})
export class SbbetabookComponent implements OnInit {
  email: string;
  notify = false;
  constructor(private SC: SocketConnService) { }

  ngOnInit(): void {
  }

  notifyMe(): void {
    if (this.email !== '' || this.email !== null) {
      this.SC.sendBetaNotify(this.email);
      this.email = '';
      this.notify = true;
    }
  }

}
