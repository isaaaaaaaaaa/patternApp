import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatternCompanyComponent } from './add-edit-pattern-company.component';

describe('AddEditPatternCompanyComponent', () => {
  let component: AddEditPatternCompanyComponent;
  let fixture: ComponentFixture<AddEditPatternCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPatternCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPatternCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
