import { Component, OnInit } from '@angular/core';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef,
    private wsb: WgrSportsBookService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.wsb.logOut();
    this.bsModalRef.hide();
    this.router.navigate(['/sportsbook']);
  }

  showseed(): void {

  }

  setMobileNav(type): void {
    this.bsModalRef.hide();
    this.wsb.mobileNav = type;
  }
}
