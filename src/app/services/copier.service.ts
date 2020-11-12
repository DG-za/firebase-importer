import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import CollectionReference = firebase.firestore.CollectionReference;
import DocumentData = firebase.firestore.DocumentData;
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({ providedIn: 'root' })
export class CopierService {
  constructor(private fbService: FirebaseService) {}

  fetchData(projectId: string, collectionPath: string, docId?: string) {
    const db = this.fbService.getDb(projectId);
    const collection = db.collection(collectionPath);

    if (docId) return this.getFromDocument(collection, docId);
    else return this.getFromCollection(collection);
  }

  private async getFromCollection(collection: CollectionReference<DocumentData>) {
    const results = await collection.get();
    return results.docs.map(result => {
      return { id: result.id, ...result.data() };
    });
  }

  private async getFromDocument(collection: CollectionReference<DocumentData>, docId: string) {
    const result = await collection.doc(docId).get();
    return { id: result.id, ...result.data() };
  }

  setItem(value: any, projectId: string, collectionPath: string, id: string): Promise<void> {
    const db = this.fbService.getDb(projectId);
    return db.collection(collectionPath).doc(id).set(value);
  }

  addItem(value: any, projectId: string, collectionPath: string): Promise<DocumentReference<DocumentData>> {
    const db = this.fbService.getDb(projectId);
    return db.collection(collectionPath).add(value);
  }

  setItems(values: any[], projectId: string, collectionPath: string): Promise<void[]> {
    return Promise.all(values.map(value => this.setItem(value, projectId, collectionPath, value.id)));
  }

  addItems(values: any[], projectId: string, collectionPath: string): Promise<DocumentReference<DocumentData>[]> {
    return Promise.all(values.map(value => this.addItem(value, projectId, collectionPath)));
  }
}
