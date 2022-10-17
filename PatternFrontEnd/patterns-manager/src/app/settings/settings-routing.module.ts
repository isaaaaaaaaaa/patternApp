import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
