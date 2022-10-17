import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatternTypeComponent } from './add-edit-pattern-type.component';

describe('AddEditPatternTypeComponent', () => {
  let component: AddEditPatternTypeComponent;
  let fixture: ComponentFixture<AddEditPatternTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPatternTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPatternTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
