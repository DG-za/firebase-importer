import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { CollectionData } from '../models/collection-data';
import { FirebaseOptions } from '../models/firebase-options';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  apps: firebase.app.App[] = [];
  dbs: firebase.firestore.Firestore[] = [];

  constructor(private notify: NotificationService) {}

  async upload(data: CollectionData[], projectId?: string): Promise<void> {
    const db = this.getDb(projectId);

    for (const collection of data)
      for (const item of collection.values) db.collection(collection.name).add(item).then(console.log);
  }

  init(configText: string): any {
    const firebaseConfig = this.getFirebaseConfigFromText(configText);
    const existingApp = this.getApp(firebaseConfig.projectId ?? ' ');

    if (existingApp) this.notify.warn('Firebase previously initialised');
    else this.initialiseFirebase(firebaseConfig);
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

  private getDb(projectId?: string) {
    if (projectId) return this.dbs.find(db => db.app.name === projectId);
    else return this.dbs[0];
  }

  private getApp(projectId?: string) {
    if (projectId) return this.apps.find(app => app.name === projectId);
    else return this.apps[0];
  }
}
