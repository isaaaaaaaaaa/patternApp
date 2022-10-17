import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PatternsComponent } from './patterns.component';
import { PatternsRoutingModule } from './patterns-routing.module';

@NgModule({
  declarations: [
    PatternsComponent
  ],
  imports: [
    CommonModule,
    PatternsRoutingModule
  ]
})
export class PatternsModule { }
