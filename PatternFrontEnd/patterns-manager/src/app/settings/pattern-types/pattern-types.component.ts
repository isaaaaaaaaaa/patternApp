import { Component, OnInit } from '@angular/core';

import { PatternType } from './../_models/pattern-type';
import { PatternTypesService } from './../_services/pattern-types.service';

@Component({
  selector: 'pm-pattern-types',
  templateUrl: './pattern-types.component.html',
  styleUrls: ['./pattern-types.component.scss']
})
export class PatternTypesComponent implements OnInit {

  patternTypes: PatternType[]= [];
  isLoading: boolean = false;

  constructor(
    private patternTypesService: PatternTypesService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading = true;
    this.patternTypesService.getAll().subscribe(patternTypes => {
      this.patternTypes = patternTypes;
      this.isLoading = false;
    })
  }

  delete(id:number|undefined): void {
    if(id !== undefined) {
      this.isLoading = true;
      this.patternTypesService.delete(id).subscribe(res => {
        this.isLoading = false;
        this.getAll();
      });
    }

  }
}
