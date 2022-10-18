import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatternComponent } from './add-edit-pattern.component';

describe('AddEditPatternComponent', () => {
  let component: AddEditPatternComponent;
  let fixture: ComponentFixture<AddEditPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPatternComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
