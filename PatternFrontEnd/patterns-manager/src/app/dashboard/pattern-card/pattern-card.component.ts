import { Component, Input, OnInit } from '@angular/core';

import { Pattern } from './../../patterns/_models/pattern';

@Component({
  selector: 'pm-pattern-card',
  templateUrl: './pattern-card.component.html',
  styleUrls: ['./pattern-card.component.scss']
})
export class PatternCardComponent implements OnInit {

  @Input() pattern!: Pattern;
  constructor() { }

  ngOnInit(): void {
  }

}
