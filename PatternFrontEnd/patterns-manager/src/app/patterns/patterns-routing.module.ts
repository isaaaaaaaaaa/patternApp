import { RouterModule, Routes } from '@angular/router';

import { AddEditPatternComponent } from './add-edit-pattern/add-edit-pattern.component';
import { NgModule } from '@angular/core';
import { PatternsComponent } from './patterns.component';

const routes: Routes = [
  {
    path: '',
    component: PatternsComponent,
  },
  {
    path: ':id',
    component: AddEditPatternComponent,
  },
  {
    path: 'new',
    component: AddEditPatternComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatternsRoutingModule { }
