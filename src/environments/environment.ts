// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  access: 'prod',
  testnet: {
    accountEnabled: true,
    ver: 2,
    testnet: true,
    socketUrl: 'https://seminole.wagerr.com/wgr',
    socketPath: '/ws',
  },
  beta: {
    accountEnabled: true,
    ver: 2,
    testnet: false,
    socketUrl: 'https://choctaw.wagerr.com/wgr',
    socketPath: '/ws',
  },
  prod: {
    accountEnabled: true,
    ver: 2,
    testnet: false,
    socketUrl: 'https://wagerr.com/wgr',
    socketPath: '/ws',
  },
  dev: {
    accountEnabled: true,
    ver: 2,
    testnet: false,
    socketUrl: 'http://10.5.0.222:3000/wgr',
    socketPath: '/socket.io',
  },
  dpath: 'm/0\'/0/',
  seasalt: 'SeaSaltKey',
  seasaltsecond: 'https://youtu.be/BKorP55Aqvg',
  firebase: {
    apiKey: '23423423',
    authDomain: '234234234',
    databaseURL: '234234234',
    projectId: '234234',
    storageBucket: '234234',
    messagingSenderId: '23423423'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
