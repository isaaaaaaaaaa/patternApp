import { RouterModule, Routes } from '@angular/router';

import { AddEditPatternCompanyComponent } from './pattern-companies/add-edit-pattern-company/add-edit-pattern-company.component';
import { AddEditPatternTypeComponent } from './pattern-types/add-edit-pattern-type/add-edit-pattern-type.component';
import { NgModule } from '@angular/core';
import { PatternCompaniesComponent } from './pattern-companies/pattern-companies.component';
import { PatternTypesComponent } from './pattern-types/pattern-types.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
  {
    path: 'pattern-types',
    component: PatternTypesComponent,
  },
  {
    path: 'pattern-types/:id',
    component: AddEditPatternTypeComponent,
  },
  {
    path: 'pattern-types/new',
    component: AddEditPatternTypeComponent,
  },
  {
    path: 'pattern-companies',
    component: PatternCompaniesComponent,
  },
  {
    path: 'pattern-companies/:id',
    component: AddEditPatternCompanyComponent,
  },
  {
    path: 'pattern-companies/new',
    component: AddEditPatternCompanyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
