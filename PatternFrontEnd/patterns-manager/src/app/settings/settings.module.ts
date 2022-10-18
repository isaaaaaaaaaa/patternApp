import { AddEditPatternTypeComponent } from './pattern-types/add-edit-pattern-type/add-edit-pattern-type.component';
import { AngularMaterialModule } from './../shared/_modules/angular-material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { PatternTypesComponent } from './pattern-types/pattern-types.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { PatternCompaniesComponent } from './pattern-companies/pattern-companies.component';
import { AddEditPatternCompanyComponent } from './pattern-companies/add-edit-pattern-company/add-edit-pattern-company.component';

@NgModule({
  declarations: [
    SettingsComponent,
    PatternTypesComponent,
    AddEditPatternTypeComponent,
    PatternCompaniesComponent,
    AddEditPatternCompanyComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
