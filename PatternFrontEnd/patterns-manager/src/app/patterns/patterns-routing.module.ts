import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PatternsComponent } from './patterns.component';

const routes: Routes = [
  {
    path: '',
    component: PatternsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatternsRoutingModule { }
