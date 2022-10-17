import { Base } from "src/app/shared/_models/base";

export interface ValueDomain extends Base {
  name?: string;
  entityType?: string;
  valueType?: string;
}
