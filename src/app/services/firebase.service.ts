import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import firebase from 'firebase';
import {CollectionData} from '../models/collection-data';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  db: firebase.firestore.Firestore;

  constructor(private snack: MatSnackBar) {
  }

  async upload(data: CollectionData[]): Promise<void> {
    for (const collection of data)
      for (const item of collection.values)
        this.db.collection(collection.name).add(item).then(console.log);
  }

  init(configText: string): any {
    try {
      const firebaseConfig = this.getFirebaseConfigFromText(configText);
      const app = firebase.initializeApp(firebaseConfig, firebaseConfig.projectId);
      this.db = app.firestore();
      this.snack.open('Firebase initialised');
      return firebaseConfig;
    } catch (e) {
      this.snack.open(`ERROR: ${e}`);
    }
  }

  private getFirebaseConfigFromText(text: string): any {
    const lines = text.split('\n');
    const properties = this.getPropertiesTuples(lines);

    return this.convertTuplesIntoConfig(properties);
  }

  private getPropertiesTuples(lines: string[]): [string, string][] {
    return lines.map(line => {
      const value = line.trim().split(':');
      return [value[0], value.slice(1).join(":").trim()];
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
}
