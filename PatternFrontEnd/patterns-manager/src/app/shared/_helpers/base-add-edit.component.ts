import {
  Component,
  EventEmitter,
  Injectable,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

@Injectable()
export abstract class BaseAddEditComponent implements OnInit {
  id!: number;
  isAddMode!: boolean;
  isLoading = false;
  isSubmitted = false;


  constructor(
    private route: ActivatedRoute,
  ) {}


  ngOnInit() {
    this.id = this.route.snapshot.params['id'] ==='new' ? null: this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }
}
