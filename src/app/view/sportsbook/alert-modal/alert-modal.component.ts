import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  @Input() msg: string;
  constructor(
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
