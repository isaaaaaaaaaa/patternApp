import { Base } from "src/app/shared/_models/base";
import { ValueDomain } from './../../settings/_models/value-domain';

export interface ValueDomainValue extends Base {
  value?: string;
  valueDomainId?: number;
  valueDomain?: ValueDomain;
  entityId?: number;
}
