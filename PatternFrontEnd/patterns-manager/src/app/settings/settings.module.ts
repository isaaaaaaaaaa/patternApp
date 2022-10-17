import { AngularMaterialModule } from './../shared/_modules/angular-material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { PatternTypesComponent } from './pattern-types/pattern-types.component';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { AddEditPatternTypeComponent } from './pattern-types/add-edit-pattern-type/add-edit-pattern-type.component';

@NgModule({
  declarations: [
    SettingsComponent,
    PatternTypesComponent,
    AddEditPatternTypeComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
