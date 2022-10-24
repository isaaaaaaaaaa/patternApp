import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternCardComponent } from './pattern-card.component';

describe('PatternCardComponent', () => {
  let component: PatternCardComponent;
  let fixture: ComponentFixture<PatternCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
