import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snack: MatSnackBar) {}

  error(text: string) {
    this.createSnack(`❌ ${text}`);
  }

  warn(text: string) {
    this.createSnack(`⚠️ ${text}`);
  }

  success(text: string) {
    this.createSnack(`✔️ ${text}`);
  }

  createSnack(text: string) {
    this.snack.open(text);
  }
}
