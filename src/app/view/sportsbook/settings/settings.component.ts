import {Component, OnInit} from '@angular/core';
import {WgrSportsBookService} from '../../../service/wgr-sports-book.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userAccount: any;
  isTop = true;
  showSeed = false;
  currency = [
    {
      type: 'usd',
      full: 'USD (Dollar)'
    },
    {
      type: 'eur',
      full: 'EUR (Euro)'
    },
    {
      type: 'gbp',
      full: 'GBP (Pounds)'
    },
    {
      type: 'jpy',
      full: 'JPY (Yen)'
    },
    {
      type: 'krw',
      full: 'KRW (Won)'
    },
    {
      type: 'cny',
      full: 'CNY (Renminbi)'
    },
    {
      type: 'cad',
      full: 'CAD (Canadian dollar)'
    },
    {
      type: 'rub',
      full: 'RUB (Russian rouble)'
    },
    {
      type: 'mxn',
      full: 'MXN (Mexican peso)'
    },
    {
      type: 'sgd',
      full: 'SGD (Singapore dollar)'
    },
    {
      type: 'hkd',
      full: 'HKD (Hong Kong dollar)'
    },
    {
      type: 'aud',
      full: 'AUD (Australian dollar)'
    },
    {
      type: 'inr',
      full: 'INR (Indian rupee)'
    }
  ];
  odds = [
    {
      type: 'euro',
      full: 'European (1.96)'
    },
    {
      type: 'us',
      full: 'American (-104)'
    }
  ];
  input = [
    {
      type: '3',
      full: 'Split less than 3'
    },
    {
      type: '4',
      full: 'Split less than 4'
    },
    {
      type: '5',
      full: 'Split less than 5'
    },
    {
      type: '6',
      full: 'Split less than 6'
    },
    {
      type: '7',
      full: 'Split less than 7'
    },
    {
      type: '8',
      full: 'Split less than 8'
    },
    {
      type: '9',
      full: 'Split less than 9'
    },
    {
      type: '10',
      full: 'Split less than 10'
    }
  ];
  user: any;
  seed = {
    word1: '',
    word2: '',
    word3: '',
    word4: '',
    word5: '',
    word6: '',
    word7: '',
    word8: '',
    word9: '',
    word10: '',
    word11: '',
    word12: '',
  };

  constructor(private wsb: WgrSportsBookService) {
    this.wsb.account.subscribe((gotAccount: any) => {
      this.userAccount = gotAccount;
      if (gotAccount && gotAccount.settings) {
        this.user = gotAccount.settings;
      }
      this.breakDownSeed(gotAccount.mnemonicSeed);
    });
  }

  breakDownSeed(seed: string): void {
    const seedWords = seed.split(' ');
    seedWords.forEach((value: string, key: number) => {
      this.seed['word' + (key + 1)] = value;
    });
  }

  saveToStore(user: any): void {
    this.userAccount.settings = user;
    this.wsb.updateUserSetting(this.userAccount);
  }

  checkUserBet(): void {
    if (this.user.bet < 25) {
      this.user.bet = 25;
    } else if (this.user.bet > 10000) {
      this.user.bet = 10000;
    }
    this.saveToStore(this.user);
  }

  ngOnInit(): void {
  }

  whatOS(): string {
    let Name = '';
    if (navigator.userAgent.indexOf('Win') !== -1) {
      Name =
        'desktop';
    }
    if (navigator.userAgent.indexOf('Mac') !== -1) {
      Name =
        'desktop';
    }
    if (navigator.userAgent.indexOf('Linux') !== -1) {
      Name =
        'desktop';
    }
    if (navigator.userAgent.indexOf('Android') !== -1) {
      Name =
        'mobile';
      this.isTop = false;
    }
    if (navigator.userAgent.indexOf('like Mac') !== -1) {
      Name =
        'mobile';
      this.isTop = false;
    }
    return Name;
  }

  setUser(type: string, value: string): void {
    this.user[type] = value;
    this.saveToStore(this.user);
  }

  displayFull(type: string, set: any): string {
    const output = set.filter((thing: any) => {
      return (thing.type === type);
    });
    return output[0].full;
  }

}
