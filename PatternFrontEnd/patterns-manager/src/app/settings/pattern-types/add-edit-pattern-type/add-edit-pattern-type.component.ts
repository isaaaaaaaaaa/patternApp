import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { BaseAddEditComponent } from 'src/app/shared/_helpers/base-add-edit.component';
import { ControlsOf } from 'src/app/shared/_helpers/controls-of';
import { PatternType } from './../../_models/pattern-type';
import { PatternTypesService } from './../../_services/pattern-types.service';

@Component({
  selector: 'pm-add-edit-pattern-type',
  templateUrl: './add-edit-pattern-type.component.html',
  styleUrls: ['./add-edit-pattern-type.component.scss'],
})
export class AddEditPatternTypeComponent
  extends BaseAddEditComponent
  implements OnInit
{
  patternTypeFormGroup = new FormGroup<ControlsOf<PatternType>>({
    id: new FormControl(0, {
      nonNullable: true,
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private patternTypesService: PatternTypesService
  ) {
    super(route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (!this.isAddMode) {
      this.isLoading = true;
      this.patternTypesService.getById(this.id).subscribe((patternType) => {
        this.patternTypeFormGroup.patchValue(patternType);
        this.isLoading = false;
      });
    }
  }

  onSubmit(): void {
    if (this.patternTypeFormGroup.valid) {
      this.isLoading = true;
      this.patternTypesService
        .updateCreate(this.patternTypeFormGroup.get('id')?.value!, this.patternTypeFormGroup.getRawValue())
        .subscribe((res) => {
          this.isLoading = false;
          this.router.navigate(['pattern-types']);
        });
    }
  }
}
