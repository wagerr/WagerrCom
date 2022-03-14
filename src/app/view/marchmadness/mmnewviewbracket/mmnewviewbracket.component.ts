import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SubmitModalComponent} from "../submit-modal/submit-modal.component";
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";
import {QuestionairComponent} from "../questionair/questionair.component";

const base = require('../../../../assets/basebracket.json')

@Component({
  selector: 'app-mmnewviewbracket',
  templateUrl: './mmnewviewbracket.component.html',
  styleUrls: ['./mmnewviewbracket.component.scss']
})
export class MmnewviewbracketComponent implements OnInit {
  bsModalRef: BsModalRef;
  @Input() new: boolean;
  @Input() hash: string;
  questionAnswered: boolean;

  baseBracket = base;

  finalScore: any = [];

  finalBracket: any = {};

  userBracket = {
    bracket: {
      'West Region': {
        roundTwo: [
          {
            set: [
              {
                rank: '',
                name: '',
              },
              {
                rank: '',
                name: '',
              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',
              },
              {
                rank: '',
                name: '',
              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ],
        roundThree: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
        ],
        roundFour: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ]
      },
      'East Region': {
        roundTwo: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ],
        roundThree: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
        ],
        roundFour: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ]
      },
      'South Region': {
        roundTwo: [
          {
            set: [
              {
                rank: '',
                name: '',
              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ],
        roundThree: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
        ],
        roundFour: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ]
      },
      'Midwest Region': {
        roundTwo: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ],
        roundThree: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
        ],
        roundFour: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ]
      },
      finalFour: {
        roundFive: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          },
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ],
        roundSix: [
          {
            set: [
              {
                rank: '',
                name: '',

              },
              {
                rank: '',
                name: '',

              }
            ]
          }
        ],
        roundSeven: [
          {
            set: [
              {
                rank: '',
                name: '',

              }
            ]
          }
        ]
      }
    },
    final: {
      bracketString: {},
      bracketHash: '',
      home: 0,
      away: 0,
      txid: ''
    }
  }

  constructor(
    private wsb: WgrSportsBookService,
    private modalService: BsModalService,) {
  }

  ngOnInit(): void {
    this.finalScore[0] = 0;
    this.finalScore[1] = 0;
    this.getUserBalance();
    this.wsb.account.subscribe((data: any) => {
      if (data && data.uid) {
        if (!data.settings.email && this.new) {
          this.questionair();
        }
      }
    });
    if (!this.new) {
      this.finalBracket = this.wsb.getMarchMadnessFinalBracket();
      this.wsb.marchMadnessFoundBracket.subscribe((bracket: any) => {
        if (bracket.final) {
          this.hash = bracket.final.bracketHash;
          this.userBracket = bracket;
          this.finalScore[0] = this.userBracket.final.home;
          this.finalScore[1] = this.userBracket.final.away;
        }
      });
      this.wsb.getMarchMadnessBracketFromHash(this.hash);

    }
  }

  questionair() {
    if (!this.questionAnswered) {
      this.bsModalRef = this.modalService.show(QuestionairComponent,
        // @ts-ignore
        Object.assign({}, {class: 'modal-lg', backdrop: 'static'}));
      this.questionAnswered = true;
    }
  }

  getBracketCount(): number {
    return this.wsb.getMarchMadnessBracketCount();
  }

  getUserBalance(): void {
    const userBalance = this.wsb.getUserBalance();
    if (userBalance == 0) {
      this.wsb.MarchMadnessFaucet();
    }
  }

  userCanSubmit(): boolean {
    const winnerSelected = (this.userBracket.bracket.finalFour.roundSeven[0].set[0].rank != '');
    const hasChampionship = (this.userBracket.bracket.finalFour.roundSix[0].set[0].rank != '' && this.userBracket.bracket.finalFour.roundSix[0].set[1].rank != '')
    const userBalance = this.wsb.getUserBalance();
    return (userBalance > 0 && winnerSelected && hasChampionship && this.validateScore());
  }

  validateScore(): boolean {
    const whoIsWinner = (this.userBracket.bracket.finalFour.roundSeven[0].set[0] === this.userBracket.bracket.finalFour.roundSix[0].set[0]);
    if (whoIsWinner) {
      return (this.finalScore[0] >= this.finalScore[1]);
    }
    return (this.finalScore[1] >= this.finalScore[0])
  }

  isSelected(round, i, ti, bracket): string {
    let ret = '';
    const roundLook = Math.floor(i / 2);
    if (this.new) {
      if (this.userBracket.bracket[bracket][round][roundLook].set[0].name === ti.name) {
        ret = 'mmSelected';
      }
      if (this.userBracket.bracket[bracket][round][roundLook].set[1].name === ti.name) {
        ret = 'mmSelected';
      }
    } if (!this.new && this.finalBracket[bracket]) {
      ret = 'mmFLose';
      if (this.finalBracket[bracket][round][roundLook].set[0].name === ti.name) {
        ret = 'mmFWin';
      }
      if (this.finalBracket[bracket][round][roundLook].set[1] && this.finalBracket[bracket][round][roundLook].set[1].name === ti.name) {
        ret = 'mmFWin';
      }
    }
    return ret;
  }

  roundChangeClear(bracket: string, startRound: string, oldTi: any) {
    const getBracket = this.userBracket.bracket[bracket];
    const finalFour = this.userBracket.bracket.finalFour;
    if (startRound === 'roundTwo') {
      this.clearSet(getBracket.roundThree, oldTi);
      this.clearSet(getBracket.roundFour, oldTi);
      this.clearSet(finalFour.roundFive, oldTi);
      this.clearSet(finalFour.roundSix, oldTi);
      this.clearSet(finalFour.roundSeven, oldTi);
    }
    if (startRound === 'roundThree') {
      this.clearSet(getBracket.roundFour, oldTi);
      this.clearSet(finalFour.roundFive, oldTi);
      this.clearSet(finalFour.roundSix, oldTi);
      this.clearSet(finalFour.roundSeven, oldTi);
    }
    if (startRound === 'roundFour') {
      this.clearSet(finalFour.roundFive, oldTi);
      this.clearSet(finalFour.roundSix, oldTi);
      this.clearSet(finalFour.roundSeven, oldTi);
    }
    if (startRound === 'roundFive') {
      this.clearSet(finalFour.roundSix, oldTi);
      this.clearSet(finalFour.roundSeven, oldTi);
    }
    if (startRound === 'roundSix') {
      this.clearSet(finalFour.roundSeven, oldTi);
    }

  }

  clearSet(brackets, oldTi) {
    for ( let i = 0; i < brackets.length; i++) {
      for (let bi = 0; bi < brackets[i].set.length; bi++) {
        if (brackets[i].set[bi] === oldTi) {
          brackets[i].set[bi] = {rank: '', name: ''};
        }
      }
    }
  }

  baseSelect(basei, i, ti, bracket) {
    if (this.new) {
      let set = 0;
      const round = Math.floor(i / 2);
      if (i & 1) {
        set = 1
      } else {
        set = 0
      }
      this.roundChangeClear(bracket, 'roundTwo', this.userBracket.bracket[bracket].roundTwo[round].set[set]);
      this.userBracket.bracket[bracket].roundTwo[round].set[set] = this.baseBracket[basei].set[i].set[ti]
    }
  }

  roundTwo(i, ti, bracket) {
    if (this.new) {
      let set = 0;
      const round = Math.floor(i / 2);
      if (i & 1) {
        set = 1
      } else {
        set = 0
      }
      if (this.verifyBracket(this.userBracket.bracket[bracket].roundTwo[i].set)) {
        this.roundChangeClear(bracket, 'roundThree', this.userBracket.bracket[bracket].roundThree[round].set[set]);
        this.userBracket.bracket[bracket].roundThree[round].set[set] = this.userBracket.bracket[bracket].roundTwo[i].set[ti]
      }
    }
  }

  roundThree(i, ti, bracket) {
    if (this.new) {
      let set = 0;
      const round = Math.floor(i / 2);
      if (i & 1) {
        set = 1
      } else {
        set = 0
      }
      if (this.verifyBracket(this.userBracket.bracket[bracket].roundThree[i].set)) {
        this.roundChangeClear(bracket, 'roundFour', this.userBracket.bracket[bracket].roundFour[round].set[set]);
        this.userBracket.bracket[bracket].roundFour[round].set[set] = this.userBracket.bracket[bracket].roundThree[i].set[ti]
      }
    }
  }

  roundFour(i, ti, basei, bracket) {
    if (this.new) {
      let set = 0;
      const round = Math.floor(basei / 2);
      if (basei & 1) {
        set = 1
      } else {
        set = 0
      }
      if (this.verifyBracket(this.userBracket.bracket[bracket].roundFour[i].set)) {
        this.roundChangeClear('finalFour', 'roundFive', this.userBracket.bracket.finalFour.roundFive[round].set[set]);
        this.userBracket.bracket.finalFour.roundFive[round].set[set] = this.userBracket.bracket[bracket].roundFour[i].set[ti]
      }
    }
  }

  roundFive(i, ti) {
    if (this.new) {
      let set = 0;
      if (i & 1) {
        set = 1
      } else {
        set = 0
      }
      if (this.verifyBracket(this.userBracket.bracket.finalFour.roundFive[i].set)) {
        this.roundChangeClear('finalFour', 'roundSix', this.userBracket.bracket.finalFour.roundSix[0].set[set]);
        this.userBracket.bracket.finalFour.roundSix[0].set[set] = this.userBracket.bracket.finalFour.roundFive[i].set[ti]
      }
    }
  }

  roundSix(i, ti) {
    if (this.new) {
      let set = 0;
      if (i & 1) {
        set = 1
      } else {
        set = 0
      }
      if (this.verifyBracket(this.userBracket.bracket.finalFour.roundSix[i].set)) {
        this.userBracket.bracket.finalFour.roundSeven[0].set[set] = this.userBracket.bracket.finalFour.roundSix[i].set[ti]
      }
    }
  }

  async roundFinal() {
    const homeFinalScore = this.finalScore[0];
    const awayFinalScore = this.finalScore[1];
    let finalHome: any = this.userBracket.bracket.finalFour.roundSix[0].set[0];
    finalHome.score = homeFinalScore;
    finalHome.winner = (homeFinalScore > awayFinalScore);
    let finalAway: any = this.userBracket.bracket.finalFour.roundSix[0].set[1];
    finalAway.score = awayFinalScore;
    finalHome.winner = (homeFinalScore < awayFinalScore);
    this.userBracket.bracket.finalFour.roundSix[0].set[0] = finalHome;
    this.userBracket.bracket.finalFour.roundSix[0].set[1] = finalAway;
    this.userBracket.final.bracketString = this.userBracket.bracket;
    this.userBracket.final.bracketHash = await this.sha256(JSON.stringify(this.userBracket.bracket));
    this.userBracket.final.home = this.finalScore[0];
    this.userBracket.final.away = this.finalScore[1];
  }

  verifyBracket(set): boolean {
    let ret = true
    if (set[0].name === '') {
      ret = false;
    }
    if (set[1].name === '') {
      ret = false;
    }
    return ret;
  }

  openSubmitBracket(): void {
    this.roundFinal();
    this.wsb.marchMadness = this.userBracket.final;
    this.bsModalRef = this.modalService.show(SubmitModalComponent,
      // @ts-ignore
      Object.assign({}, {class: 'modal-lg', backdrop: 'static'}));
  }

  async sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
  }

  canSubmit(): boolean {
    const canSubmit = Date.now();
    if (canSubmit < 1616169600000) {
      return true;
    }
    return false;
  }

  getJson(object: any) {
    return JSON.stringify(object);
  }

}
