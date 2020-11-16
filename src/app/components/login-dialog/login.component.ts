import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Subject } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  email?: string;
  password?: string;

  loading$ = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private app: firebase.app.App,
    private notify: NotificationService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {}

  async signInWithEmail() {
    this.loading$.next(true);

    this.app
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(_ => this.handleLogin())
      .catch(e => this.handleError(e));
  }

  async signInWithTwitter() {
    this.signInWithProvider(new firebase.auth.TwitterAuthProvider());
  }

  async signInWithGoogle() {
    this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
  }

  async signInWithFacebook() {
    this.signInWithProvider(new firebase.auth.FacebookAuthProvider());
  }

  async signInWithGithub() {
    this.signInWithProvider(new firebase.auth.GithubAuthProvider());
  }

  private signInWithProvider(provider: firebase.auth.AuthProvider) {
    this.loading$.next(true);

    this.app
      .auth()
      .signInWithPopup(provider)
      .then(_ => this.handleLogin())
      .catch(e => this.handleError(e));
  }

  private handleLogin() {
    this.loading$.next(false);

    this.notify.success('Logged in successfully');
    this.dialogRef.close();
  }

  private handleError(error: string) {
    this.loading$.next(false);
    this.notify.error(error);
  }
}
