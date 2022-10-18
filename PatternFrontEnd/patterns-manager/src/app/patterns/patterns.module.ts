import { AddEditPatternComponent } from './add-edit-pattern/add-edit-pattern.component';
import { AngularMaterialModule } from './../shared/_modules/angular-material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { PatternsComponent } from './patterns.component';
import { PatternsRoutingModule } from './patterns-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    PatternsComponent,
    AddEditPatternComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    PatternsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PatternsModule { }
