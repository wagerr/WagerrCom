import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  userCoreData: any;
  uuid: string;
  createdAt: any;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private http: HttpClient,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.createdAt = new Date();
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password): any {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email, password): any {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail(): any {
    // return this.afAuth.currentUser.sendEmailVerification()
    //   .then(() => {
    //     this.router.navigate(['verify-email-address']);
    //   });
  }

  getAngularUUID(): void {
    this.uuid = uuid();
  }

  getUserData(): any {
    this.http.get('https://www.cloudflare.com/cdn-cgi/trace', {responseType: 'text'}).subscribe((d: any) => {
      let data = d.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
      data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
      this.userCoreData = JSON.parse(data);
    });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail): any {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get userID(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? user.uid : null;
  }

  get email(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? user.email : 'null';
  }
  // Sign in with Google
  GoogleAuth(): any {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Google
  FacebookAuth(): any {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Sign in with Google
  TwitterAuth(): any {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider): any {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user): any {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut(): any {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

}
