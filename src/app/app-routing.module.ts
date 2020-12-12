import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './view/home/home.component';
import {AboutComponent} from './view/about/about.component';
import {GetStartedComponent} from './view/get-started/get-started.component';
import {SportsbookComponent} from './view/sportsbook/sportsbook.component';
import {SbdisplayComponent} from './view/sportsbook/sbdisplay/sbdisplay.component';
import {HomeLayoutComponent} from './view/home-layout/home-layout.component';
import {PrintSeedCodeComponent} from './view/print-seed-code/print-seed-code.component';
import {FadethewinjaComponent} from './view/fadethewinja/fadethewinja.component';
import {FadethedegenComponent} from './view/fadethedegen/fadethedegen.component';
import {TestTeamlogoComponent} from './test-teamlogo/test-teamlogo.component';
import {SbhistoryComponent} from './view/sportsbook/sbhistory/sbhistory.component';
import {SbcoreComponent} from './view/sportsbook/sbcore/sbcore.component';
import {SbEventComponent} from './view/sportsbook/sb-event/sb-event.component';
import {SettingsComponent} from './view/sportsbook/settings/settings.component';
import {AffiliateDashboardComponent} from './view/sportsbook/affiliate-dashboard/affiliate-dashboard.component';

const sportsbookDisplay: Routes = [
  { path: '', component: SbcoreComponent },
  { path: 'event/:eventid', component: SbEventComponent },
  { path: 'history', component: SbhistoryComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'affiliate', component: AffiliateDashboardComponent  },
];

const sportsbook: Routes = [
  { path: '', component: SbdisplayComponent, children: sportsbookDisplay },
];

const home: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fadethewinja', component: FadethewinjaComponent },
  { path: 'fadethedegen', component: FadethedegenComponent },
  { path: 'fadethedgen', component: FadethedegenComponent },
  { path: 'about', component: AboutComponent},
  { path: 'download', component: GetStartedComponent},
  { path: 'teamlogo/:team', component: TestTeamlogoComponent }
];

const routes: Routes = [
  { path: '', component: HomeLayoutComponent, children: home },
  { path: 'ref', redirectTo: '/', pathMatch: 'full' },
  { path: 'ref/:refAddress', component: HomeLayoutComponent, children: home },
  { path: 'printSeedCode', component: PrintSeedCodeComponent },
  { path: 'sportsbook', component: SportsbookComponent, children: sportsbook},
  { path: 'sb/ref', redirectTo: '/sportsbook', pathMatch: 'full' },
  { path: 'sb/ref/:refAddress', component: SportsbookComponent, children: sportsbook},
  { path: 'sportsbook/ref', redirectTo: '/sportsbook', pathMatch: 'full' },
  { path: 'sportsbook/ref/:refAddress', component: SportsbookComponent, children: sportsbook},
  { path: 'sportsbook/:event/:user/:betId', component: SportsbookComponent, children: sportsbook},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
