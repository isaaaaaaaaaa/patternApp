import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Pattern } from './_models/pattern';
import { PatternsService } from './_services/patterns.service';

@Component({
  selector: 'pm-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss'],
})
export class PatternsComponent implements OnInit {
  isLoading: boolean = false;
  patterns: any;
  displayedColumns: string[] = [];

  constructor(private patternsService: PatternsService) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'imgUrl',
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

      this.patterns = new MatTableDataSource(res);


    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patterns.filter = filterValue.trim().toLowerCase();
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
