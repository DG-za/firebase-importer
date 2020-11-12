import { Component } from '@angular/core';
import { cleanVariables } from '../../helpers/helper';
import { CollectionData } from '../../models/collection-data';
import { FirebaseOptions } from '../../models/firebase-options';
import { CopierService } from '../../services/copier.service';
import { FirebaseService } from '../../services/firebase.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-data-copy',
  templateUrl: './data-copy.component.html',
  styleUrls: ['./data-copy.component.css'],
})
export class DataCopyComponent {
  configText: string;
  results: any;
  fileData: CollectionData[];
  collectionPath: string;
  documentId: string;
  keepIds = false;

  target: FirebaseOptions;
  source: FirebaseOptions;

  constructor(private service: FirebaseService, private copier: CopierService, private notify: NotificationService) {}

  initFirebase(): void {
    this.service.init(this.configText);
  }

  async getData(): Promise<void> {
    this.results = await this.copier.fetchData(this.source.projectId, this.collectionPath, this.documentId);
  }

  async uploadData() {
    let promise: Promise<any>;

    if (this.isMultipleDocs) promise = this.uploadMultiple();
    else promise = this.uploadSingle();

    promise.then(_ => this.notify.success('Upload complete')).catch(e => this.notify.error(e));

    this.results = undefined;
    this.collectionPath = undefined;
  }

  private async uploadSingle() {
    if (this.keepIds)
      return this.copier.setItem(this.results, this.target.projectId, this.collectionPath, this.results.id);
    else return this.copier.addItem(this.results, this.target.projectId, this.collectionPath);
  }

  private async uploadMultiple() {
    if (this.keepIds) return this.copier.setItems(this.results, this.target.projectId, this.collectionPath);
    else return this.copier.addItems(this.results, this.target.projectId, this.collectionPath);
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

  fetchIsReady() {
    return this.sourceIsReady() && !!this.collectionPath;
  }

  uploadIsReady() {
    return !!this.results && !!this.target;
  }

  get isMultipleDocs() {
    return !this.documentId;
  }
}
