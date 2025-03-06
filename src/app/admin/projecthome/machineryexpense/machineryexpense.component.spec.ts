import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryexpenseComponent } from './machineryexpense.component';

describe('MachineryexpenseComponent', () => {
  let component: MachineryexpenseComponent;
  let fixture: ComponentFixture<MachineryexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineryexpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineryexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
