import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SubmitModalComponent} from "../submit-modal/submit-modal.component";
import {WgrSportsBookService} from "../../../service/wgr-sports-book.service";

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
      set: [
        {
          set: [
            {
              rank: '16',
              name: 'FDU/Batman',
            },
            {
              rank: '1',
              name: 'Gonzaga',
            },
          ]
        },
        {
          set: [
            {
              rank: '9',
              name: 'Baylor',
            },
            {
              rank: '8',
              name: 'Syracuse',
            },]
        },
        {
          set: [
            {
              rank: '13',
              name: 'Vermont',
            },
            {
              rank: '4',
              name: 'Florida',
            },]
        },
        {
          set: [
            {
              rank: '12',
              name: 'Murray',
            },
            {
              rank: '5',
              name: 'Marquette',
            },]
        },
        {
          set: [
            {
              rank: '11',
              name: 'Arizona State Sun Devils',
            },
            {
              rank: '6',
              name: 'Buffalo Bulls',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Nothern',
            },
            {
              rank: '3',
              name: 'Texas Tech',
            },]
        },
        {
          set: [
            {
              rank: '10',
              name: 'Florida Gators',
            },
            {
              rank: '6',
              name: 'Navada',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Montana',
            },
            {
              rank: '3',
              name: 'Michigan',
            },
          ]
        },
      ]
    },
    {
      name: 'south',
      set: [
        {
          set: [
            {
              rank: '16',
              name: 'FDU/Batman',
            },
            {
              rank: '1',
              name: 'Gonzaga',
            },
          ]
        },
        {
          set: [
            {
              rank: '9',
              name: 'Baylor',
            },
            {
              rank: '8',
              name: 'Syracuse',
            },]
        },
        {
          set: [
            {
              rank: '13',
              name: 'Vermont',
            },
            {
              rank: '4',
              name: 'Florida',
            },]
        },
        {
          set: [
            {
              rank: '12',
              name: 'Murray',
            },
            {
              rank: '5',
              name: 'Marquette',
            },]
        },
        {
          set: [
            {
              rank: '11',
              name: 'Arizona State Sun Devils',
            },
            {
              rank: '6',
              name: 'Buffalo Bulls',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Nothern',
            },
            {
              rank: '3',
              name: 'Texas Tech',
            },]
        },
        {
          set: [
            {
              rank: '10',
              name: 'Florida Gators',
            },
            {
              rank: '6',
              name: 'Navada',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Montana',
            },
            {
              rank: '3',
              name: 'Michigan',
            },
          ]
        },
      ]
    },
    {
      name: 'east',
      set: [
        {
          set: [
            {
              rank: '16',
              name: 'FDU/Batman',
            },
            {
              rank: '1',
              name: 'Gonzaga',
            },
          ]
        },
        {
          set: [
            {
              rank: '9',
              name: 'Baylor',
            },
            {
              rank: '8',
              name: 'Syracuse',
            },]
        },
        {
          set: [
            {
              rank: '13',
              name: 'Vermont',
            },
            {
              rank: '4',
              name: 'Florida',
            },]
        },
        {
          set: [
            {
              rank: '12',
              name: 'Murray',
            },
            {
              rank: '5',
              name: 'Marquette',
            },]
        },
        {
          set: [
            {
              rank: '11',
              name: 'Arizona State Sun Devils',
            },
            {
              rank: '6',
              name: 'Buffalo Bulls',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Nothern',
            },
            {
              rank: '3',
              name: 'Texas Tech',
            },]
        },
        {
          set: [
            {
              rank: '10',
              name: 'Florida Gators',
            },
            {
              rank: '6',
              name: 'Navada',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Montana',
            },
            {
              rank: '3',
              name: 'Michigan',
            },
          ]
        },
      ]
    },
    {
      name: 'midwest',
      set: [
        {
          set: [
            {
              rank: '16',
              name: 'FDU/Batman'
            },
            {
              rank: '1',
              name: 'Gonzaga',
            },
          ]
        },
        {
          set: [
            {
              rank: '9',
              name: 'Baylor',
            },
            {
              rank: '8',
              name: 'Syracuse',
            },]
        },
        {
          set: [
            {
              rank: '13',
              name: 'Vermont',
            },
            {
              rank: '4',
              name: 'Florida',
            },]
        },
        {
          set: [
            {
              rank: '12',
              name: 'Murray',
            },
            {
              rank: '5',
              name: 'Marquette',
            },]
        },
        {
          set: [
            {
              rank: '11',
              name: 'Arizona State Sun Devils',
            },
            {
              rank: '6',
              name: 'Buffalo Bulls',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Nothern',
            },
            {
              rank: '3',
              name: 'Texas Tech',
            },]
        },
        {
          set: [
            {
              rank: '10',
              name: 'Florida Gators',
            },
            {
              rank: '6',
              name: 'Navada',
            },]
        },
        {
          set: [
            {
              rank: '14',
              name: 'Montana',
            },
            {
              rank: '3',
              name: 'Michigan',
            },
          ]
        },
      ]
    }
  ]

  finalScore: any = [];

  bracket = '{"bracket":{"west":{"roundOne":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"}]}],"roundTwo":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"},{"rank":"9","name":"Baylor","wgrteamid":"2"}]},{"set":[{"rank":"13","name":"Vermont","wgrteamid":"4"},{"rank":"12","name":"Murray","wgrteamid":"6"}]},{"set":[{"rank":"6","name":"Buffalo Bulls","wgrteamid":"9"},{"rank":"3","name":"Texas Tech","wgrteamid":"11","score":300,"winner":false}]},{"set":[{"rank":"6","name":"Navada","wgrteamid":"9"},{"rank":"3","name":"Michigan","wgrteamid":"11"}]}],"roundThree":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"},{"rank":"13","name":"Vermont","wgrteamid":"4"}]},{"set":[{"rank":"3","name":"Texas Tech","wgrteamid":"11","score":300,"winner":false},{"rank":"3","name":"Michigan","wgrteamid":"11"}]}],"roundFour":[{"set":[{"rank":"13","name":"Vermont","wgrteamid":"4"},{"rank":"3","name":"Texas Tech","wgrteamid":"11","score":300,"winner":false}]}]},"south":{"roundOne":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"}]}],"roundTwo":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"},{"rank":"9","name":"Baylor","wgrteamid":"2"}]},{"set":[{"rank":"13","name":"Vermont","wgrteamid":"4"},{"rank":"12","name":"Murray","wgrteamid":"6"}]},{"set":[{"rank":"11","name":"Arizona State Sun Devils","wgrteamid":"8"},{"rank":"14","name":"Nothern","wgrteamid":"10"}]},{"set":[{"rank":"10","name":"Florida Gators","wgrteamid":"8"},{"rank":"14","name":"Montana","wgrteamid":"10"}]}],"roundThree":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"},{"rank":"13","name":"Vermont","wgrteamid":"4"}]},{"set":[{"rank":"11","name":"Arizona State Sun Devils","wgrteamid":"8"},{"rank":"10","name":"Florida Gators","wgrteamid":"8"}]}],"roundFour":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"},{"rank":"11","name":"Arizona State Sun Devils","wgrteamid":"8"}]}]},"east":{"roundOne":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"}]}],"roundTwo":[{"set":[{"rank":"1","name":"Gonzaga","wgrteamid":"1"},{"rank":"8","name":"Syracuse","wgrteamid":"3"}]},{"set":[{"rank":"4","name":"Florida","wgrteamid":"5"},{"rank":"5","name":"Marquette","wgrteamid":"7"}]},{"set":[{"rank":"6","name":"Buffalo Bulls","wgrteamid":"9"},{"rank":"3","name":"Texas Tech","wgrteamid":"11"}]},{"set":[{"rank":"6","name":"Navada","wgrteamid":"9"},{"rank":"3","name":"Michigan","wgrteamid":"11"}]}],"roundThree":[{"set":[{"rank":"8","name":"Syracuse","wgrteamid":"3"},{"rank":"5","name":"Marquette","wgrteamid":"7"}]},{"set":[{"rank":"3","name":"Texas Tech","wgrteamid":"11"},{"rank":"3","name":"Michigan","wgrteamid":"11"}]}],"roundFour":[{"set":[{"rank":"5","name":"Marquette","wgrteamid":"7"},{"rank":"3","name":"Texas Tech","wgrteamid":"11"}]}]},"midwest":{"roundOne":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"}]}],"roundTwo":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"},{"rank":"8","name":"Syracuse","wgrteamid":"3"}]},{"set":[{"rank":"13","name":"Vermont","wgrteamid":"4"},{"rank":"5","name":"Marquette","wgrteamid":"7"}]},{"set":[{"rank":"11","name":"Arizona State Sun Devils","wgrteamid":"8","score":0},{"rank":"3","name":"Texas Tech","wgrteamid":"11"}]},{"set":[{"rank":"10","name":"Florida Gators","wgrteamid":"8"},{"rank":"3","name":"Michigan","wgrteamid":"11"}]}],"roundThree":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"},{"rank":"13","name":"Vermont","wgrteamid":"4"}]},{"set":[{"rank":"11","name":"Arizona State Sun Devils","wgrteamid":"8","score":0},{"rank":"10","name":"Florida Gators","wgrteamid":"8"}]}],"roundFour":[{"set":[{"rank":"16","name":"FDU","wgrteamid":"0"},{"rank":"11","name":"Arizona State Sun Devils","wgrteamid":"8","score":0}]}]},"finalFour":{"roundFive":[{"set":[{"rank":"3","name":"Texas Tech","wgrteamid":"11","score":300,"winner":false},{"rank":"16","name":"FDU","wgrteamid":"0"}]},{"set":[{"rank":"5","name":"Marquette","wgrteamid":"7"},{"rank":"11","name":"Arizona State Sun Devils","wgrteamid":"8","score":0}]}],"roundSix":[{"set":[{"rank":"3","name":"Texas Tech","wgrteamid":"11","score":300,"winner":false},{"rank":"11","name":"Arizona State Sun Devils","wgrteamid":"8","score":0}]}],"roundSeven":[{"set":[{"rank":"3","name":"Texas Tech","wgrteamid":"11","score":300,"winner":false}]}]}},"final":{"bracketString":"{\\"west\\":{\\"roundOne\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"}]}],\\"roundTwo\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"},{\\"rank\\":\\"9\\",\\"name\\":\\"Baylor\\",\\"wgrteamid\\":\\"2\\"}]},{\\"set\\":[{\\"rank\\":\\"13\\",\\"name\\":\\"Vermont\\",\\"wgrteamid\\":\\"4\\"},{\\"rank\\":\\"12\\",\\"name\\":\\"Murray\\",\\"wgrteamid\\":\\"6\\"}]},{\\"set\\":[{\\"rank\\":\\"6\\",\\"name\\":\\"Buffalo Bulls\\",\\"wgrteamid\\":\\"9\\"},{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\",\\"score\\":300,\\"winner\\":false}]},{\\"set\\":[{\\"rank\\":\\"6\\",\\"name\\":\\"Navada\\",\\"wgrteamid\\":\\"9\\"},{\\"rank\\":\\"3\\",\\"name\\":\\"Michigan\\",\\"wgrteamid\\":\\"11\\"}]}],\\"roundThree\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"},{\\"rank\\":\\"13\\",\\"name\\":\\"Vermont\\",\\"wgrteamid\\":\\"4\\"}]},{\\"set\\":[{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\",\\"score\\":300,\\"winner\\":false},{\\"rank\\":\\"3\\",\\"name\\":\\"Michigan\\",\\"wgrteamid\\":\\"11\\"}]}],\\"roundFour\\":[{\\"set\\":[{\\"rank\\":\\"13\\",\\"name\\":\\"Vermont\\",\\"wgrteamid\\":\\"4\\"},{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\",\\"score\\":300,\\"winner\\":false}]}]},\\"south\\":{\\"roundOne\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"}]}],\\"roundTwo\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"},{\\"rank\\":\\"9\\",\\"name\\":\\"Baylor\\",\\"wgrteamid\\":\\"2\\"}]},{\\"set\\":[{\\"rank\\":\\"13\\",\\"name\\":\\"Vermont\\",\\"wgrteamid\\":\\"4\\"},{\\"rank\\":\\"12\\",\\"name\\":\\"Murray\\",\\"wgrteamid\\":\\"6\\"}]},{\\"set\\":[{\\"rank\\":\\"11\\",\\"name\\":\\"Arizona State Sun Devils\\",\\"wgrteamid\\":\\"8\\"},{\\"rank\\":\\"14\\",\\"name\\":\\"Nothern\\",\\"wgrteamid\\":\\"10\\"}]},{\\"set\\":[{\\"rank\\":\\"10\\",\\"name\\":\\"Florida Gators\\",\\"wgrteamid\\":\\"8\\"},{\\"rank\\":\\"14\\",\\"name\\":\\"Montana\\",\\"wgrteamid\\":\\"10\\"}]}],\\"roundThree\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"},{\\"rank\\":\\"13\\",\\"name\\":\\"Vermont\\",\\"wgrteamid\\":\\"4\\"}]},{\\"set\\":[{\\"rank\\":\\"11\\",\\"name\\":\\"Arizona State Sun Devils\\",\\"wgrteamid\\":\\"8\\"},{\\"rank\\":\\"10\\",\\"name\\":\\"Florida Gators\\",\\"wgrteamid\\":\\"8\\"}]}],\\"roundFour\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"},{\\"rank\\":\\"11\\",\\"name\\":\\"Arizona State Sun Devils\\",\\"wgrteamid\\":\\"8\\"}]}]},\\"east\\":{\\"roundOne\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"}]}],\\"roundTwo\\":[{\\"set\\":[{\\"rank\\":\\"1\\",\\"name\\":\\"Gonzaga\\",\\"wgrteamid\\":\\"1\\"},{\\"rank\\":\\"8\\",\\"name\\":\\"Syracuse\\",\\"wgrteamid\\":\\"3\\"}]},{\\"set\\":[{\\"rank\\":\\"4\\",\\"name\\":\\"Florida\\",\\"wgrteamid\\":\\"5\\"},{\\"rank\\":\\"5\\",\\"name\\":\\"Marquette\\",\\"wgrteamid\\":\\"7\\"}]},{\\"set\\":[{\\"rank\\":\\"6\\",\\"name\\":\\"Buffalo Bulls\\",\\"wgrteamid\\":\\"9\\"},{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\"}]},{\\"set\\":[{\\"rank\\":\\"6\\",\\"name\\":\\"Navada\\",\\"wgrteamid\\":\\"9\\"},{\\"rank\\":\\"3\\",\\"name\\":\\"Michigan\\",\\"wgrteamid\\":\\"11\\"}]}],\\"roundThree\\":[{\\"set\\":[{\\"rank\\":\\"8\\",\\"name\\":\\"Syracuse\\",\\"wgrteamid\\":\\"3\\"},{\\"rank\\":\\"5\\",\\"name\\":\\"Marquette\\",\\"wgrteamid\\":\\"7\\"}]},{\\"set\\":[{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\"},{\\"rank\\":\\"3\\",\\"name\\":\\"Michigan\\",\\"wgrteamid\\":\\"11\\"}]}],\\"roundFour\\":[{\\"set\\":[{\\"rank\\":\\"5\\",\\"name\\":\\"Marquette\\",\\"wgrteamid\\":\\"7\\"},{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\"}]}]},\\"midwest\\":{\\"roundOne\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"}]}],\\"roundTwo\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"},{\\"rank\\":\\"8\\",\\"name\\":\\"Syracuse\\",\\"wgrteamid\\":\\"3\\"}]},{\\"set\\":[{\\"rank\\":\\"13\\",\\"name\\":\\"Vermont\\",\\"wgrteamid\\":\\"4\\"},{\\"rank\\":\\"5\\",\\"name\\":\\"Marquette\\",\\"wgrteamid\\":\\"7\\"}]},{\\"set\\":[{\\"rank\\":\\"11\\",\\"name\\":\\"Arizona State Sun Devils\\",\\"wgrteamid\\":\\"8\\",\\"score\\":0},{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\"}]},{\\"set\\":[{\\"rank\\":\\"10\\",\\"name\\":\\"Florida Gators\\",\\"wgrteamid\\":\\"8\\"},{\\"rank\\":\\"3\\",\\"name\\":\\"Michigan\\",\\"wgrteamid\\":\\"11\\"}]}],\\"roundThree\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"},{\\"rank\\":\\"13\\",\\"name\\":\\"Vermont\\",\\"wgrteamid\\":\\"4\\"}]},{\\"set\\":[{\\"rank\\":\\"11\\",\\"name\\":\\"Arizona State Sun Devils\\",\\"wgrteamid\\":\\"8\\",\\"score\\":0},{\\"rank\\":\\"10\\",\\"name\\":\\"Florida Gators\\",\\"wgrteamid\\":\\"8\\"}]}],\\"roundFour\\":[{\\"set\\":[{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"},{\\"rank\\":\\"11\\",\\"name\\":\\"Arizona State Sun Devils\\",\\"wgrteamid\\":\\"8\\",\\"score\\":0}]}]},\\"finalFour\\":{\\"roundFive\\":[{\\"set\\":[{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\",\\"score\\":300,\\"winner\\":false},{\\"rank\\":\\"16\\",\\"name\\":\\"FDU\\",\\"wgrteamid\\":\\"0\\"}]},{\\"set\\":[{\\"rank\\":\\"5\\",\\"name\\":\\"Marquette\\",\\"wgrteamid\\":\\"7\\"},{\\"rank\\":\\"11\\",\\"name\\":\\"Arizona State Sun Devils\\",\\"wgrteamid\\":\\"8\\",\\"score\\":0}]}],\\"roundSix\\":[{\\"set\\":[{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\",\\"score\\":300,\\"winner\\":false},{\\"rank\\":\\"11\\",\\"name\\":\\"Arizona State Sun Devils\\",\\"wgrteamid\\":\\"8\\",\\"score\\":0}]}],\\"roundSeven\\":[{\\"set\\":[{\\"rank\\":\\"3\\",\\"name\\":\\"Texas Tech\\",\\"wgrteamid\\":\\"11\\",\\"score\\":300,\\"winner\\":false}]}]}}","bracketHash":"1bf656c3d37c09864533eb8109b00305a5df7e83c27b14868569ddceeb8b73ca","home":300,"away":0}}';

  userBracket = {
    bracket: {
      west: {
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
      south: {
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
      east: {
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
      midwest: {
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
      bracketString: '',
      bracketHash: '',
      home: 0,
      away: 0
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
  }

  getUserBalance(): void {
    const userBalance = this.wsb.getUserBalance();
    if (userBalance == 0) {
      this.wsb.MarchMadnessFaucet();
    }
  }

  userCanSubmit(): boolean {
    const winnerSelected = (this.userBracket.bracket.finalFour.roundSeven[0].set[0].rank != '');
    const hasChampionshp = (this.userBracket.bracket.finalFour.roundSix[0].set[0].rank != '' && this.userBracket.bracket.finalFour.roundSix[0].set[1].rank != '')
    const userBalance = this.wsb.getUserBalance();
    return (userBalance > 0 && winnerSelected && hasChampionshp && this.validateScore());
  }

  validateScore(): boolean {
    const whoIsWinner = (this.userBracket.bracket.finalFour.roundSeven[0].set[0] === this.userBracket.bracket.finalFour.roundSix[0].set[0]);
    if (whoIsWinner) {
      return (this.finalScore[0] >= this.finalScore[1]);
    }
    return (this.finalScore[1] >= this.finalScore[0])
  }

  isSelected(round, i, ti, bracket) {
    let ret = false;
    const roundLook = Math.floor(i / 2);
    if (this.userBracket.bracket[bracket][round][roundLook].set[0] === ti) {
      ret = true;
    }
    if (this.userBracket.bracket[bracket][round][roundLook].set[1] === ti) {
      ret = true;
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
    console.log('gotBracket', getBracket);

  }

  clearSet(brackets, oldTi) {
    for ( let i = 0; i < brackets.length; i++) {
      console.log('set', brackets[i].set)
      for (let bi = 0; bi < brackets[i].set.length; bi++) {
        if (brackets[i].set[bi] === oldTi) {
          brackets[i].set[bi] = {rank: '', name: ''};
        }
      }
    }
  }

  baseSelect(basei, i, ti, bracket) {
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

  roundTwo(i, ti, bracket) {

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

  roundThree(i, ti, bracket) {
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

  roundFour(i, ti, basei, bracket) {
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

  roundFive(i, ti) {
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

  roundSix(i, ti) {
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
    this.userBracket.final.bracketString = JSON.stringify(this.userBracket.bracket);
    this.userBracket.final.bracketHash = await this.sha256(JSON.stringify(this.userBracket.bracket));
    this.userBracket.final.home = this.finalScore[0];
    this.userBracket.final.away = this.finalScore[1];
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
    this.roundFinal();
    console.log('userBracket', this.userBracket);
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

}
