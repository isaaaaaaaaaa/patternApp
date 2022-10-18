import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternCompaniesComponent } from './pattern-companies.component';

describe('PatternCompaniesComponent', () => {
  let component: PatternCompaniesComponent;
  let fixture: ComponentFixture<PatternCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternCompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
