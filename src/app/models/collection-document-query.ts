import { Query } from './query';

export interface CollectionDocumentQuery {
  collection: string;
  document?: string;
  query?: Query;
}
