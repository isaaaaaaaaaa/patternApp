import { PatternCompaniesService } from './../../_services/pattern-companies.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseAddEditComponent } from 'src/app/shared/_helpers/base-add-edit.component';
import { ControlsOf } from 'src/app/shared/_helpers/controls-of';
import { PatternCompany } from './../../_models/pattern-company';

@Component({
  selector: 'pm-add-edit-pattern-company',
  templateUrl: './add-edit-pattern-company.component.html',
  styleUrls: ['./add-edit-pattern-company.component.scss'],
})
export class AddEditPatternCompanyComponent
  extends BaseAddEditComponent
  implements OnInit
{
  patternCompanyFormGroup = new FormGroup<ControlsOf<PatternCompany>>({
    id: new FormControl(0, {
      nonNullable: true,
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    abbreviation: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    url: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private patternCompaniesService: PatternCompaniesService
  ) {
    super(route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (!this.isAddMode) {
      this.isLoading = true;
      this.patternCompaniesService
        .getById(this.id)
        .subscribe((patternCompany) => {
          this.patternCompanyFormGroup.patchValue(patternCompany);
          this.isLoading = false;
        });
    }
  }

  onSubmit(): void {
    if (this.patternCompanyFormGroup.valid) {
      this.isLoading = true;
      this.patternCompaniesService
        .updateCreate(
          this.patternCompanyFormGroup.get('id')?.value!,
          this.patternCompanyFormGroup.getRawValue()
        )
        .subscribe((res) => {
          this.isLoading = false;
          this.router.navigate(['settings/pattern-companies']);
        });
    }
  }
}
