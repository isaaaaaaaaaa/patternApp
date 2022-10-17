import { Base } from "src/app/shared/_models/base";
import { PatternCompany } from 'src/app/settings/_models/pattern-company';
import { PatternType } from './../../settings/_models/pattern-type';

export interface Pattern extends Base {
  name?:string;
  patternTypeId?: number;
  patternType?: PatternType;
  patternCompanyId?: number;
  patternCompany?: PatternCompany;
}
