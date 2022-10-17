import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternTypesComponent } from './pattern-types.component';

describe('PatternTypesComponent', () => {
  let component: PatternTypesComponent;
  let fixture: ComponentFixture<PatternTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
