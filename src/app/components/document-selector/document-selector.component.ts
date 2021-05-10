import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CollectionDocumentQuery } from '../../models/collection-document-query';
import { Query } from '../../models/query';
import { WhereFilterOp } from '../../models/where-filter-op';

@Component({
  selector: 'app-document-selector',
  templateUrl: './document-selector.component.html',
  styleUrls: ['./document-selector.component.css'],
})
export class DocumentSelectorComponent implements OnInit {
  collectionPath?: string;
  documentId?: string;
  showQuery = false;

  query: Query = { field: '', operator: '==', value: '' };
  queryOperators: WhereFilterOp[] = [
    '<',
    '<=',
    '==',
    '!=',
    '>=',
    '>',
    'array-contains',
    'in',
    'not-in',
    'array-contains-any',
  ];

  @Input() title = 'Collection setup';
  @Input() buttonText = 'Set path';
  @Input() disabled = true;

  @Output() buttonClicked = new EventEmitter<CollectionDocumentQuery>();

  constructor() {}

  ngOnInit(): void {}

  isReady() {
    return this.collectionPath;
  }

  emitData() {
    if (this.collectionPath && this.collectionPath.length > 0) {
      this.buttonClicked.emit({
        collection: this.collectionPath,
        document: this.showQuery ? undefined : this.documentId,
        query: this.showQuery ? this.query : undefined,
      });
    }
  }
}
