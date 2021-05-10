import { WhereFilterOp } from './where-filter-op';

export interface Query {
  field: string;
  operator: WhereFilterOp;
  value: string;
}
