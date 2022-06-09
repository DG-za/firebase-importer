import { Component } from '@angular/core';
import { cleanVariables } from '../../helpers/helper';
import { CollectionData } from '../../models/collection-data';
import { CollectionDocumentQuery } from '../../models/collection-document-query';
import { FirebaseOptions } from '../../models/firebase-options';
import { Query } from '../../models/query';
import { CopierService } from '../../services/copier.service';
import { FirebaseService } from '../../services/firebase.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-data-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css'],
})
export class CopyComponent {
  configText: string;
  results: any;
  fileData: CollectionData[];
  collectionPath: string;
  targetPath: string;
  documentId: string;
  keepIds = false;

  target: FirebaseOptions;
  source: FirebaseOptions;
  query: Query;

  constructor(private service: FirebaseService, private copier: CopierService, private notify: NotificationService) {}

  get isMultipleDocs() {
    return !this.documentId;
  }

  initFirebase(): void {
    this.service.init(this.configText);
  }

  async getData(collectionDoc: CollectionDocumentQuery): Promise<void> {
    this.collectionPath = collectionDoc.collection;
    this.targetPath ??= this.collectionPath;
    this.documentId = collectionDoc.document;
    this.query = collectionDoc.query;

    this.results = await this.copier.fetchData(this.source.projectId, this.collectionPath, this.documentId, this.query);
  }

  async uploadData() {
    let promise: Promise<any>;

    if (this.isMultipleDocs) {
      promise = this.uploadMultiple();
    } else {
      promise = this.uploadSingle();
    }

    promise.then(_ => this.notify.success('Upload complete')).catch(e => this.notify.error(e));

    this.results = undefined;
    this.collectionPath = undefined;
  }

  handleConfig(): void {
    this.configText = cleanVariables(this.configText);
  }

  getSource(source: FirebaseOptions) {
    this.source = source;
  }

  getTarget(target: FirebaseOptions) {
    this.target = target;
  }

  sourceIsReady() {
    return !!this.source;
  }

  uploadIsReady() {
    return !!this.results && !!this.target;
  }

  private async uploadSingle() {
    if (this.keepIds) return this.copier.setItem(this.results, this.target.projectId, this.targetPath, this.results.id);
    else return this.copier.addItem(this.results, this.target.projectId, this.targetPath);
  }

  private async uploadMultiple() {
    if (this.keepIds) return this.copier.setItems(this.results, this.target.projectId, this.targetPath);
    else return this.copier.addItems(this.results, this.target.projectId, this.targetPath);
  }
}
