import { TestBed } from '@angular/core/testing';

import { PatternTypesService } from './pattern-types.service';

describe('PatternTypesService', () => {
  let service: PatternTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
