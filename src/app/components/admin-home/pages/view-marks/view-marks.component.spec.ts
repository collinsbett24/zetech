import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMarksComponent } from './view-marks.component';

describe('ViewMarksComponent', () => {
  let component: ViewMarksComponent;
  let fixture: ComponentFixture<ViewMarksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMarksComponent]
    });
    fixture = TestBed.createComponent(ViewMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
