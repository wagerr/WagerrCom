import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './view/home/home.component';
import {AboutComponent} from './view/about/about.component';
import {GetStartedComponent} from './view/get-started/get-started.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './view/footer/footer.component';
import {HeaderComponent} from './view/header/header.component';
import {environment} from '../environments/environment';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

const config: SocketIoConfig = {url: environment[environment.access].socketUrl, options: {path: environment[environment.access].socketPath}};

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgMarqueeModule} from 'ng-marquee';
import {DateAgoPipe} from './pipes/date-ago.pipe';
import {SportsbookComponent} from './view/sportsbook/sportsbook.component';
import {HomeLayoutComponent} from './view/home-layout/home-layout.component';
import {SbdisplayComponent} from './view/sportsbook/sbdisplay/sbdisplay.component';
import {SbbalanceComponent} from './view/sportsbook/sbbalance/sbbalance.component';
import {SbchaingamesComponent} from './view/sportsbook/sbchaingames/sbchaingames.component';
import {SbbetslipComponent} from './view/sportsbook/sbbetslip/sbbetslip.component';
import {SbchatComponent} from './view/sportsbook/sbchat/sbchat.component';
import {SbbetdisplayComponent} from './view/sportsbook/sbbetdisplay/sbbetdisplay.component';
import {SbbetexchangedisplayComponent} from './view/sportsbook/sbbetexchangedisplay/sbbetexchangedisplay.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from './service/auth.service';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import {WgrSportsBookService} from './service/wgr-sports-book.service';
import {PrintSeedCodeComponent} from './view/print-seed-code/print-seed-code.component';
import {NgxPrintModule} from 'ngx-print';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { HomemoneylineComponent } from './view/home/homemoneyline/homemoneyline.component';
import { HomespreadComponent } from './view/home/homespread/homespread.component';
import { HometotalsComponent } from './view/home/hometotals/hometotals.component';
import { SbbetabookComponent } from './view/sportsbook/sbbetabook/sbbetabook.component';
import { SbfantasyComponent } from './view/sportsbook/sbfantasy/sbfantasy.component';
import { SliderComponent } from './view/home/slider/slider.component';
import { FadethedegenComponent } from './view/fadethedegen/fadethedegen.component';
import { FadethewinjaComponent } from './view/fadethewinja/fadethewinja.component';
import { TeamlogoComponent } from './teamlogo/teamlogo.component';
import { TestTeamlogoComponent } from './test-teamlogo/test-teamlogo.component';
import { DepositComponent } from './view/sportsbook/sbdisplay/deposit/deposit.component';
import { WithdrawComponent } from './view/sportsbook/sbdisplay/withdraw/withdraw.component';
import { AccountComponent } from './view/sportsbook/sbdisplay/account/account.component';
import { SbhistoryComponent } from './view/sportsbook/sbhistory/sbhistory.component';
import { SbcoreComponent } from './view/sportsbook/sbcore/sbcore.component';
import { SbEventComponent } from './view/sportsbook/sb-event/sb-event.component';
import { ChartComponent } from './view/sportsbook/sb-event/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { SbAddDeviceComponent } from './view/sportsbook/sb-add-device/sb-add-device.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SbAddDeviceCodeComponent } from './view/sportsbook/sb-add-device-code/sb-add-device-code.component';
import { SettingsComponent } from './view/sportsbook/settings/settings.component';
import { EurousoddsComponent } from './view/sportsbook/sbbetdisplay/eurousodds/eurousodds.component';
import { AffiliateComponent } from './view/sportsbook/affiliate/affiliate.component';
import { BuyModalComponent } from './view/buy-modal/buy-modal.component';
import { AffiliateDashboardComponent } from './view/sportsbook/affiliate-dashboard/affiliate-dashboard.component';
import { LogoutModalComponent } from './view/sportsbook/logout-modal/logout-modal.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AddressValidatorService } from './utils';
import { AlertModalComponent } from './view/sportsbook/alert-modal/alert-modal.component';
import { MarchmadnessComponent } from './view/marchmadness/marchmadness.component';
import { MmsplashComponent } from './view/marchmadness/mmsplash/mmsplash.component';
import { MmleaderboardComponent } from './view/marchmadness/mmleaderboard/mmleaderboard.component';
import { MmdashboardComponent } from './view/marchmadness/mmdashboard/mmdashboard.component';
import { MmnewviewbracketComponent } from './view/marchmadness/mmnewviewbracket/mmnewviewbracket.component';
import { SubmitModalComponent } from './view/marchmadness/submit-modal/submit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    GetStartedComponent,
    FooterComponent,
    HeaderComponent,
    DateAgoPipe,
    SportsbookComponent,
    HomeLayoutComponent,
    SbdisplayComponent,
    SbbalanceComponent,
    SbchaingamesComponent,
    SbbetslipComponent,
    SbchatComponent,
    SbbetdisplayComponent,
    SbbetexchangedisplayComponent,
    PrintSeedCodeComponent,
    HomemoneylineComponent,
    HomespreadComponent,
    HometotalsComponent,
    SbbetabookComponent,
    SbfantasyComponent,
    SliderComponent,
    FadethedegenComponent,
    FadethewinjaComponent,
    TeamlogoComponent,
    TestTeamlogoComponent,
    DepositComponent,
    WithdrawComponent,
    AccountComponent,
    SbhistoryComponent,
    SbcoreComponent,
    SbEventComponent,
    ChartComponent,
    SbAddDeviceComponent,
    SbAddDeviceCodeComponent,
    SettingsComponent,
    EurousoddsComponent,
    AffiliateComponent,
    BuyModalComponent,
    AffiliateDashboardComponent,
    LogoutModalComponent,
    AlertModalComponent,
    MarchmadnessComponent,
    MmsplashComponent,
    MmleaderboardComponent,
    MmdashboardComponent,
    MmnewviewbracketComponent,
    SubmitModalComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    NgMarqueeModule,
    AppRoutingModule,
    NgxPrintModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AddressValidatorService,
    AuthService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
