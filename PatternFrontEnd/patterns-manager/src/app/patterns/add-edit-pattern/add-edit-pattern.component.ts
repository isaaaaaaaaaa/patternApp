import { PatternCompany } from './../../settings/_models/pattern-company';
import { PatternType } from './../../settings/_models/pattern-type';
import { Pattern } from './../_models/pattern';
import { PatternsService } from './../_services/patterns.service';
import { PatternTypesService } from './../../settings/_services/pattern-types.service';
import { BaseAddEditComponent } from 'src/app/shared/_helpers/base-add-edit.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatternCompaniesService } from 'src/app/settings/_services/pattern-companies.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from 'src/app/shared/_helpers/controls-of';

@Component({
  selector: 'pm-add-edit-pattern',
  templateUrl: './add-edit-pattern.component.html',
  styleUrls: ['./add-edit-pattern.component.scss']
})
export class AddEditPatternComponent extends BaseAddEditComponent implements OnInit {

  patternTypes: PatternType[] = [];
  patternCompanies: PatternCompany[] = [];
  patternFormGroup = new FormGroup<ControlsOf<Pattern>>({
    id: new FormControl(0, {
      nonNullable: true,
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    patternTypeId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    patternCompanyId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    imgUrl: new FormControl("TEMP", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });


  constructor(
    route: ActivatedRoute,
    private router: Router,
    private patternCompaniesService: PatternCompaniesService,
    private patternTypesService: PatternTypesService,
    private patternsService: PatternsService

  ) {
    super(route);
  }

  override ngOnInit(): void {

    this.patternCompaniesService.getAll().subscribe(res => {
      this.patternCompanies = res;
      this.patternFormGroup.get('patternCompanyId')?.setValue(this.patternCompanies[0].id);
    });
    this.patternTypesService.getAll().subscribe(res => {
      this.patternTypes = res;
      this.patternFormGroup.get('patternTypeId')?.setValue(this.patternTypes[0].id);
    });

    super.ngOnInit();
    if (!this.isAddMode) {
      this.isLoading = true;
      this.patternsService
        .getById(this.id)
        .subscribe((pattern) => {
          this.patternFormGroup.patchValue(pattern);
          this.isLoading = false;
        });
    }
  }

  onSubmit(): void {
    if (this.patternFormGroup.valid) {
      this.isLoading = true;
      this.patternsService
        .updateCreate(
          this.patternFormGroup.get('id')?.value!,
          this.patternFormGroup.getRawValue()
        )
        .subscribe((res) => {
          this.isLoading = false;
          this.router.navigate(['patterns']);
        });
    }
  }
}
