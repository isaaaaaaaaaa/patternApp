import { AngularMaterialModule } from './../shared/_modules/angular-material.module';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { PatternCardComponent } from './pattern-card/pattern-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PatternCardComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    DashboardRoutingModule
  ],
  exports: [PatternCardComponent]
})
export class DashboardModule { }
