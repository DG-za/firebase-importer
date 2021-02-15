import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { LoginComponent } from '../components/login-dialog/login.component';
import { CollectionData } from '../models/collection-data';
import { FirebaseOptions } from '../models/firebase-options';
import { UploadOptions } from '../models/upload-options';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  apps: firebase.app.App[] = [];
  dbs: firebase.firestore.Firestore[] = [];

  constructor(private notify: NotificationService, private dialog: MatDialog) {}

  async upload(data: CollectionData[], options: UploadOptions = {}): Promise<void> {
    const db = this.getDb(options?.projectId);

    for (const collection of data)
      for (const item of collection.values) {
        const path = this.buildCollectionPath(options.collectionName ?? collection.name, options.parentPath);

        if (options.documentId) db.collection(path).doc(options.documentId).set(item);
        else db.collection(path).add(item);
      }
  }

  init(configText: string): any {
    const firebaseConfig = this.getFirebaseConfigFromText(configText);
    const existingApp = this.getApp(firebaseConfig.projectId ?? ' ');

    if (existingApp) this.notify.warn('Firebase previously initialised');
    else this.initialiseFirebase(firebaseConfig);

    return firebaseConfig;
  }

  getDb(projectId?: string) {
    if (projectId) return this.dbs.find(db => db.app.name === projectId);
    else return this.dbs[0];
  }

  getApp(projectId?: string) {
    if (projectId) return this.apps.find(app => app.name === projectId);
    else return this.apps[0];
  }

  login(projectId?: string) {
    const app = this.getApp(projectId);
    if (app) this.dialog.open(LoginComponent, { data: app, width: '450px' });
  }

  private initialiseFirebase(firebaseConfig: FirebaseOptions) {
    try {
      const app = firebase.initializeApp(firebaseConfig, firebaseConfig.projectId);

      this.apps.push(app);
      this.dbs.push(app.firestore());

      this.notify.success('Firebase initialised');
      return firebaseConfig;
    } catch (e) {
      this.notify.error(e);
    }
  }

  private getFirebaseConfigFromText(text: string): FirebaseOptions {
    const lines = text.split('\n');
    const properties = this.getPropertiesTuples(lines);

    return this.convertTuplesIntoConfig(properties);
  }

  private getPropertiesTuples(lines: string[]): [string, string][] {
    return lines.map(line => {
      const value = line.trim().split(':');
      return [value[0], value.slice(1).join(':').trim()];
    });
  }

  private convertTuplesIntoConfig(properties: [string, string][]): any {
    return properties
      .filter(property => property[0].length > 0)
      .reduce((total, [key, current]) => {
        total[key] = current;
        return total;
      }, {});
  }

  private buildCollectionPath(collectionName: string, parentPath?: string) {
    return parentPath ? `${parentPath}/${collectionName}` : collectionName;
  }
}
