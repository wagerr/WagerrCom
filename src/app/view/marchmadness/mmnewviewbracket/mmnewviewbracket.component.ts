import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SubmitModalComponent} from "../submit-modal/submit-modal.component";

@Component({
  selector: 'app-mmnewviewbracket',
  templateUrl: './mmnewviewbracket.component.html',
  styleUrls: ['./mmnewviewbracket.component.scss']
})
export class MmnewviewbracketComponent implements OnInit {
  bsModalRef: BsModalRef;
  @Input() new: boolean;

  baseBracket = [
    {
      name: 'west',
      preSet: {
        markSet: 0,
        position: 0,
        mh: '0px',
        set:
          [
            {
              rank: '16',
              name: 'FDU',
              wgrteamid: '0',
            },
            {
              rank: '1',
              name: 'Gonzaga',
              wgrteamid: '1',
            }
          ],
      },
      set: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '1',
              name: 'Gonzaga',
              wgrteamid: '1',
            },
          ]
        },
        {
          set: [
            {
              rank: '9',
              name: 'Baylor',
              wgrteamid: '2',
            },
            {
              rank: '8',
              name: 'Syracuse',
              wgrteamid: '3',
            },]
        },
        {
          set: [
            {
              rank: '13',
              name: 'Vermont',
              wgrteamid: '4',
            },
            {
              rank: '4',
              name: 'Florida',
              wgrteamid: '5',
            },]
        },
        {
          set: [
            {
              rank: '12',
              name: 'Murray',
              wgrteamid: '6',
            },
            {
              rank: '5',
              name: 'Marquette',
              wgrteamid: '7',
            },]
        },
        {
          set: [
            {
              rank: '11',
              name: 'Arizona State Sun Devils',
              wgrteamid: '8',
            },
            {
              rank: '6',
              name: 'Buffalo Bulls',
              wgrteamid: '9',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Nothern',
              wgrteamid: '10',
            },
            {
              rank: '3',
              name: 'Texas Tech',
              wgrteamid: '11',
            },]
        },
        {
          set: [
            {
              rank: '10',
              name: 'Florida Gators',
              wgrteamid: '8',
            },
            {
              rank: '6',
              name: 'Navada',
              wgrteamid: '9',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Montana',
              wgrteamid: '10',
            },
            {
              rank: '3',
              name: 'Michigan',
              wgrteamid: '11',
            },
          ]
        },
      ]
    },
    {
      name: 'south',
      preSet: {
        markSet: 0,
        position: 0,
        mh: '0px',
        set:
          [
            {
              rank: '16',
              name: 'FDU',
              wgrteamid: '0',
            },
            {
              rank: '1',
              name: 'Gonzaga',
              wgrteamid: '1',
            }
          ],
      },
      set: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '1',
              name: 'Gonzaga',
              wgrteamid: '1',
            },
          ]
        },
        {
          set: [
            {
              rank: '9',
              name: 'Baylor',
              wgrteamid: '2',
            },
            {
              rank: '8',
              name: 'Syracuse',
              wgrteamid: '3',
            },]
        },
        {
          set: [
            {
              rank: '13',
              name: 'Vermont',
              wgrteamid: '4',
            },
            {
              rank: '4',
              name: 'Florida',
              wgrteamid: '5',
            },]
        },
        {
          set: [
            {
              rank: '12',
              name: 'Murray',
              wgrteamid: '6',
            },
            {
              rank: '5',
              name: 'Marquette',
              wgrteamid: '7',
            },]
        },
        {
          set: [
            {
              rank: '11',
              name: 'Arizona State Sun Devils',
              wgrteamid: '8',
            },
            {
              rank: '6',
              name: 'Buffalo Bulls',
              wgrteamid: '9',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Nothern',
              wgrteamid: '10',
            },
            {
              rank: '3',
              name: 'Texas Tech',
              wgrteamid: '11',
            },]
        },
        {
          set: [
            {
              rank: '10',
              name: 'Florida Gators',
              wgrteamid: '8',
            },
            {
              rank: '6',
              name: 'Navada',
              wgrteamid: '9',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Montana',
              wgrteamid: '10',
            },
            {
              rank: '3',
              name: 'Michigan',
              wgrteamid: '11',
            },
          ]
        },
      ]
    },
    {
      name: 'east',
      preSet: {
        markSet: 0,
        position: 0,
        mh: '0px',
        set:
          [
            {
              rank: '16',
              name: 'FDU',
              wgrteamid: '0',
            },
            {
              rank: '1',
              name: 'Gonzaga',
              wgrteamid: '1',
            }
          ],
      },
      set: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '1',
              name: 'Gonzaga',
              wgrteamid: '1',
            },
          ]
        },
        {
          set: [
            {
              rank: '9',
              name: 'Baylor',
              wgrteamid: '2',
            },
            {
              rank: '8',
              name: 'Syracuse',
              wgrteamid: '3',
            },]
        },
        {
          set: [
            {
              rank: '13',
              name: 'Vermont',
              wgrteamid: '4',
            },
            {
              rank: '4',
              name: 'Florida',
              wgrteamid: '5',
            },]
        },
        {
          set: [
            {
              rank: '12',
              name: 'Murray',
              wgrteamid: '6',
            },
            {
              rank: '5',
              name: 'Marquette',
              wgrteamid: '7',
            },]
        },
        {
          set: [
            {
              rank: '11',
              name: 'Arizona State Sun Devils',
              wgrteamid: '8',
            },
            {
              rank: '6',
              name: 'Buffalo Bulls',
              wgrteamid: '9',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Nothern',
              wgrteamid: '10',
            },
            {
              rank: '3',
              name: 'Texas Tech',
              wgrteamid: '11',
            },]
        },
        {
          set: [
            {
              rank: '10',
              name: 'Florida Gators',
              wgrteamid: '8',
            },
            {
              rank: '6',
              name: 'Navada',
              wgrteamid: '9',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Montana',
              wgrteamid: '10',
            },
            {
              rank: '3',
              name: 'Michigan',
              wgrteamid: '11',
            },
          ]
        },
      ]
    },
    {
      name: 'midwest',
      preSet: {
        markSet: 0,
        position: 0,
        mh: '0px',
        set:
          [
            {
              rank: '16',
              name: 'FDU',
              wgrteamid: '0',
            },
            {
              rank: '1',
              name: 'Gonzaga',
              wgrteamid: '1',
            }
          ],
      },
      set: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '1',
              name: 'Gonzaga',
              wgrteamid: '1',
            },
          ]
        },
        {
          set: [
            {
              rank: '9',
              name: 'Baylor',
              wgrteamid: '2',
            },
            {
              rank: '8',
              name: 'Syracuse',
              wgrteamid: '3',
            },]
        },
        {
          set: [
            {
              rank: '13',
              name: 'Vermont',
              wgrteamid: '4',
            },
            {
              rank: '4',
              name: 'Florida',
              wgrteamid: '5',
            },]
        },
        {
          set: [
            {
              rank: '12',
              name: 'Murray',
              wgrteamid: '6',
            },
            {
              rank: '5',
              name: 'Marquette',
              wgrteamid: '7',
            },]
        },
        {
          set: [
            {
              rank: '11',
              name: 'Arizona State Sun Devils',
              wgrteamid: '8',
            },
            {
              rank: '6',
              name: 'Buffalo Bulls',
              wgrteamid: '9',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Nothern',
              wgrteamid: '10',
            },
            {
              rank: '3',
              name: 'Texas Tech',
              wgrteamid: '11',
            },]
        },
        {
          set: [
            {
              rank: '10',
              name: 'Florida Gators',
              wgrteamid: '8',
            },
            {
              rank: '6',
              name: 'Navada',
              wgrteamid: '9',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Montana',
              wgrteamid: '10',
            },
            {
              rank: '3',
              name: 'Michigan',
              wgrteamid: '11',
            },
          ]
        },
      ]
    }
  ]

  finalScore: any = [];

  userBracket = {
    west: {
      roundOne: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
      ],
      roundTwo: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        }
      ]
    },
    south: {
      roundOne: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
      ],
      roundTwo: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        }
      ]
    },
    east: {
      roundOne: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
      ],
      roundTwo: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        }
      ]
    },
    midwest: {
      roundOne: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
      ],
      roundTwo: [
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        },
        {
          set: [
            {
              rank: '',
              name: '',
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
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
              wgrteamid: '',
            },
            {
              rank: '',
              name: '',
              wgrteamid: '',
            }
          ]
        }
      ]
    }
  }

  constructor(private modalService: BsModalService,) {
  }

  ngOnInit(): void {
  }

  isSelected(round, i, ti, bracket) {
    let ret = false;
    const roundLook = Math.floor(i / 2);
    if (this.userBracket[bracket][round][roundLook].set[0] === ti) {
      ret = true;
    }
    if (this.userBracket[bracket][round][roundLook].set[1] === ti) {
      ret = true;
    }
    return ret;
  }

  firstFour(basei, ti, bracket) {
    const set1 = this.baseBracket[basei].preSet.markSet;
    const set2 = this.baseBracket[basei].preSet.position;
    this.baseBracket[basei].set[set1].set[set2] = this.baseBracket[basei].preSet.set[ti];
    this.userBracket[bracket].roundOne[0].set[0] = this.baseBracket[basei].preSet.set[ti];
  }

  baseSelect(basei, i, ti, bracket) {
    let set = 0;
    const round = Math.floor(i / 2);
    if (i & 1) {
      set = 1
    } else {
      set = 0
    }
    this.userBracket[bracket].roundTwo[round].set[set] = this.baseBracket[basei].set[i].set[ti]
  }

  roundTwo(i, ti, bracket) {

    let set = 0;
    const round = Math.floor(i / 2);
    if (i & 1) {
      set = 1
    } else {
      set = 0
    }
    if (this.verifyBracket(this.userBracket[bracket].roundTwo[i].set)) {
      this.userBracket[bracket].roundThree[round].set[set] = this.userBracket[bracket].roundTwo[i].set[ti]
    }
  }

  roundThree(i, ti, bracket) {
    let set = 0;
    const round = Math.floor(i / 2);
    if (i & 1) {
      set = 1
    } else {
      set = 0
    }
    if (this.verifyBracket(this.userBracket[bracket].roundThree[i].set)) {
      this.userBracket[bracket].roundFour[round].set[set] = this.userBracket[bracket].roundThree[i].set[ti]
    }
  }

  roundFour(i, ti, basei, bracket) {
    let set = 0;
    const round = Math.floor(basei / 2);
    if (basei & 1) {
      set = 1
    } else {
      set = 0
    }
    if (this.verifyBracket(this.userBracket[bracket].roundFour[i].set)) {
      this.userBracket.finalFour.roundFive[round].set[set] = this.userBracket[bracket].roundFour[i].set[ti]
    }
  }

  roundFive(i, ti) {
    let set = 0;
    if (i & 1) {
      set = 1
    } else {
      set = 0
    }
    if (this.verifyBracket(this.userBracket.finalFour.roundFive[i].set)) {
      this.userBracket.finalFour.roundSix[0].set[set] = this.userBracket.finalFour.roundFive[i].set[ti]
    }
  }

  roundSix() {
    const final: any = this.userBracket.finalFour.roundSix[0].set[0];
    final.score = this.finalScore[0];
    const finalOne: any = this.userBracket.finalFour.roundSix[0].set[1];
    finalOne.score = this.finalScore[1];
    this.userBracket.finalFour.roundSix[0].set[0] = final;
    this.userBracket.finalFour.roundSix[0].set[1] = finalOne;
  }

  verifyBracket(set): boolean {
    let ret = true
    if (set[0].wgrteamid === '') {
      ret = false;
    }
    if (set[1].wgrteamid === '') {
      ret = false;
    }
    return ret;
  }

  openSubmitBracket(): void {
    this.roundSix();
    this.bsModalRef = this.modalService.show(SubmitModalComponent,
      // @ts-ignore
      Object.assign({}, { class: 'modal-lg', backdrop: 'static' }));
  }
}
