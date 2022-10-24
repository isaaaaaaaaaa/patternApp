import { Component, OnInit } from '@angular/core';

import { Pattern } from '../patterns/_models/pattern';
import { PatternsService } from '../patterns/_services/patterns.service';

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean =false;
  patterns: Pattern[] = [];
  constructor(private patternsService: PatternsService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading=true;
    this.patternsService.getAll().subscribe((res) => {
      this.patterns = res;
      this.isLoading = false;
    });
  }

}
