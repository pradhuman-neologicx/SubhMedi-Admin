import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelexpenseComponent } from './fuelexpense.component';

describe('FuelexpenseComponent', () => {
  let component: FuelexpenseComponent;
  let fixture: ComponentFixture<FuelexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuelexpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
