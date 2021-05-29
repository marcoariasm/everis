import { IAffiliates } from './affiliates.interface';
import { ITypeProcedure } from './typeProcedure.interface';
import { IValidation } from './validation.interface';

export interface IFlow {
  signature?: string;
  chooseProcedure?: ITypeProcedure;
  validation?: IAffiliates;
  affiliate?: IValidation;
  isAffiliate?: boolean;
  procedure?: any;
  id?: number;
}
