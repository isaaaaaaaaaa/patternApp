import { Component, OnInit } from '@angular/core';

import { Pattern } from './_models/pattern';
import { PatternsService } from './_services/patterns.service';

@Component({
  selector: 'pm-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss'],
})
export class PatternsComponent implements OnInit {
  isLoading: boolean = false;
  patterns: Pattern[] = [];
  displayedColumns: string[] = [];

  constructor(private patternsService: PatternsService) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'name',
      'patternTypeName',
      'patternCompanyName',
      'edit',
      'delete',
    ];

    this.getAll();
  }

  getAll(): void {
    this.isLoading=true;
    this.patternsService.getAll().subscribe((res) => {
      this.patterns = res;
      this.isLoading = false;
    });
  }

  delete(id: number | undefined): void {
    if (id !== undefined) {
      this.isLoading = true;
      this.patternsService.delete(id).subscribe((res) => {
        this.isLoading = false;
        this.getAll();
      });
    }
  }
}
