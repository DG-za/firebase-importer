import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CollectionDocumentPath } from '../../models/collection-document-path';

@Component({
  selector: 'app-document-selector',
  templateUrl: './document-selector.component.html',
  styleUrls: ['./document-selector.component.css'],
})
export class DocumentSelectorComponent implements OnInit {
  collectionPath?: string;
  documentId?: string;

  @Input() title = 'Collection setup';
  @Input() buttonText = 'Set path';
  @Input() disabled = true;

  @Output() buttonClicked = new EventEmitter<CollectionDocumentPath>();

  constructor() {}

  ngOnInit(): void {}

  isReady() {
    return this.collectionPath;
  }

  emitData() {
    if (this.collectionPath && this.collectionPath.length > 0) {
      this.buttonClicked.emit({ collection: this.collectionPath, document: this.documentId });
    }
  }
}
