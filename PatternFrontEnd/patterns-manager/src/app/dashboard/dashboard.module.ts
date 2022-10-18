import { AngularMaterialModule } from './../shared/_modules/angular-material.module';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
