import {environment} from '../../environments/environment';

export class Corefunc {
  private version = environment[environment.access].ver;

  getMLPoints(item: any, type: string, show = true): any {
    if (item.odds[0]['ml' + type]) {
      return this.updateTrueOdds((item.odds[0]['ml' + type] / 10000));
    }
    if (show) {
      return '—';
    }
    return 0;
  }

  getSpreadNumber(item: any, type: any, show = true): any {
    if (item.odds[1].spreadHome > 0 || item.odds[1].spreadAway > 0) {
      if (item.odds[1].spreadPoints || (this.version === 2 && item.odds[1].spreadPoints >= 0)) {
        const set = (item.odds[1].favorite === type) ? '-' : '+';
        if (this.version === 2) {
          let points = 0;
          if (type.toLowerCase() === 'away') {
            points = ((item.odds[1].spreadPoints / 100) * -1);
          } else {
            points = (item.odds[1].spreadPoints / 100);
          }
          if (points > 0) {
            return '+' + points;
          }
          return points;
        }
        return set + (item.odds[1].spreadPoints / 10);
      }
    }

    if (show) {
      return '—';
    }
    return 0;
  }

  getSpreadPoints(item: any, type: string, show = true): any {
    if ((item.odds[1].spreadPoints || (this.version === 2 && item.odds[1].spreadPoints >= 0)) && item.odds[1]['spread' + type]) {
      return this.updateTrueOdds((item.odds[1]['spread' + type] / 10000));
    }

    if (show) {
      return '—';
    }
    return 0;
  }

  getTotalsNumber(item: any, show = true): any {
    if (item.odds[2].totalsPoints) {
      if (this.version === 2) {
        return (item.odds[2].totalsPoints / 100);
      }
      return (item.odds[2].totalsPoints / 10);
    }
    if (show) {
      return '—';
    }
    return 0;
  }

  getTotalsPoints(item: any, type: string, show = true): any {
    if (item.odds[2].totalsPoints && item.odds[2]['totals' + type]) {
      return this.updateTrueOdds((item.odds[2]['totals' + type] / 10000));
    }
    if (show) {
      return '—';
    }
    return 0;
  }

  updateTrueOdds(amt: number): number {
    return 1 + (amt - 1) * 0.94;
  }

}

export const CoreFunc = new Corefunc();
