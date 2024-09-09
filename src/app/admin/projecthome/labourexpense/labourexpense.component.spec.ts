import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourexpenseComponent } from './labourexpense.component';

describe('LabourexpenseComponent', () => {
  let component: LabourexpenseComponent;
  let fixture: ComponentFixture<LabourexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabourexpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabourexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
