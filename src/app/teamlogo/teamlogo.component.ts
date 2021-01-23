import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-teamlogo',
  templateUrl: './teamlogo.component.html',
  styleUrls: ['./teamlogo.component.scss']
})
export class TeamlogoComponent implements OnInit {
  @Input() teamname: string;
  @Input() getClass: string;
  @Input() type: string = null;
  constructor() { }

  ngOnInit(): void {
  }

  processTeamName(teamname: string): string {
    let name = teamname.split(' ').join('_');
    name = name.split('é').join('e');
    name = name.split('å').join('a');
    name = name.split('á').join('a');
    name = name.split(' . ').join('a');
    name = name.split('ê').join('e');
    return name;
  }

  getSVG(teamname: string): string {
    if (this.type === 'left') {
      return 'https://img.wagerr.com/left/' + this.processTeamName(teamname);
    } else if (this.type === 'right') {
      return 'https://img.wagerr.com/right/' + this.processTeamName(teamname);
    } else if (this.type === 'away') {
      return 'https://img.wagerr.com/away/' + this.processTeamName(teamname);
    }
    return 'https://img.wagerr.com/home/' + this.processTeamName(teamname);
  }

  getPNG(teamname: string): string {
    if (this.type === 'left') {
      return 'https://img.wagerr.com/left/' + this.processTeamName(teamname);
    } else if (this.type === 'right') {
      return 'https://img.wagerr.com/right/' + this.processTeamName(teamname);
    } else if (this.type === 'away') {
      return 'https://img.wagerr.com/away/' + this.processTeamName(teamname);
    }
    return 'https://img.wagerr.com/home/' + this.processTeamName(teamname);
  }

}
