import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { cleanVariables, jsonFromFile } from '../../helpers/helper';
import { CollectionData } from '../../models/collection-data';
import { CollectionDocumentQuery } from '../../models/collection-document-query';
import { FirebaseOptions } from '../../models/firebase-options';
import { Query } from '../../models/query';
import { CopierService } from '../../services/copier.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent {
  configText: string;
  jsonData: any;
  fileData: CollectionData[];
  firestore: FirebaseOptions;
  collectionPath?: string;
  documentId?: string;
  query?: Query;
  results: any;

  constructor(private snack: MatSnackBar, private service: FirebaseService, private copier: CopierService) {}

  async handleData(event: any): Promise<void> {
    this.jsonData = await jsonFromFile(event.target.files[0] as File);

    this.fileData = CollectionData.fromJSON(this.jsonData);
  }

  upload(): void {
    this.service.upload(this.fileData);
  }

  handleConfig(): void {
    this.configText = cleanVariables(this.configText);
  }

  firestoreIsReady() {
    return !!this.firestore;
  }

  async getData(collectionDoc: CollectionDocumentQuery): Promise<void> {
    this.collectionPath = collectionDoc.collection;
    this.documentId = collectionDoc.document;
    this.query = collectionDoc.query;

    this.results = await this.copier.fetchData(
      this.firestore.projectId,
      collectionDoc.collection,
      collectionDoc.document,
      this.query
    );
  }

  downloadIsReady() {
    return !!this.results;
  }

  downloadData() {
    const uri = 'data:application/json;charset=UTF-8,' + encodeURIComponent(JSON.stringify(this.results));
    const fileName = this.getFileName();
    saveAs(uri, fileName);
  }

  private getFileName() {
    const docId = this.documentId ? `-${this.documentId}` : '';
    return `${this.firestore.projectId}-${this.collectionPath}${docId}.json`;
  }

  getFirebase(event: FirebaseOptions) {
    this.firestore = event;
  }
}
