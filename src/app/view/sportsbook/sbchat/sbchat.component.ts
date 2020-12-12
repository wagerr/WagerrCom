import { Component, OnInit } from '@angular/core';
import {SocketConnService} from "../../../service/socket-conn.service";

@Component({
  selector: 'app-sbchat',
  templateUrl: './sbchat.component.html',
  styleUrls: ['./sbchat.component.scss']
})
export class SbchatComponent implements OnInit {
  getUsername: string = '';
  username: string = '';
  chat: string = '';
  chatFeed: any = [];
  constructor(private SC: SocketConnService) { }

  ngOnInit(): void {
    this.SC.sportBookChat.subscribe((data: any) => {
      this.chatFeed = data;
    });
  }

  sendMsg() {
    if (this.chat != '' || this.chat != null) {
      this.SC.sendSportschat(this.username, this.chat);
      this.chat = '';
    }
  }
  startChat() {
    this.username = this.getUsername;
  }

}
