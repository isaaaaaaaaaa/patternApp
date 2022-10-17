import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends string| null | undefined | number | boolean
  ? FormControl<T[K]> :
  T[K] extends Array<any>? FormArray<any>: FormGroup<ControlsOf<T[K]>>
};
