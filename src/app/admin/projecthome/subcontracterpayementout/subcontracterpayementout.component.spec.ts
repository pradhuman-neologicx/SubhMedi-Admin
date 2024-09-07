import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontracterpayementoutComponent } from './subcontracterpayementout.component';

describe('SubcontracterpayementoutComponent', () => {
  let component: SubcontracterpayementoutComponent;
  let fixture: ComponentFixture<SubcontracterpayementoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcontracterpayementoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcontracterpayementoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
