import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorpaymentComponent } from './supervisorpayment.component';

describe('SupervisorpaymentComponent', () => {
  let component: SupervisorpaymentComponent;
  let fixture: ComponentFixture<SupervisorpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupervisorpaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
