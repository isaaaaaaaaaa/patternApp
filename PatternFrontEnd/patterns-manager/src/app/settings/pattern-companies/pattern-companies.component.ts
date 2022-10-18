import { Component, OnInit } from '@angular/core';

import { PatternCompaniesService } from './../_services/pattern-companies.service';
import { PatternCompany } from '../_models/pattern-company';

@Component({
  selector: 'pm-pattern-companies',
  templateUrl: './pattern-companies.component.html',
  styleUrls: ['./pattern-companies.component.scss']
})
export class PatternCompaniesComponent implements OnInit {
  patternCompanies: PatternCompany[]= [];
  isLoading: boolean = false;
  constructor(
    private patternCompaniesService: PatternCompaniesService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading = true;
    this.patternCompaniesService.getAll().subscribe(patternCompanies => {
      this.patternCompanies = patternCompanies;
      this.isLoading = false;
    });
  }

  delete(id:number|undefined): void {
    if(id !== undefined) {
      this.isLoading = true;
      this.patternCompaniesService.delete(id).subscribe(res => {
        this.isLoading = false;
        this.getAll();
      });
    }

  }
}
