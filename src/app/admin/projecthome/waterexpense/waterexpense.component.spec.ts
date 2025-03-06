import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterexpenseComponent } from './waterexpense.component';

describe('WaterexpenseComponent', () => {
  let component: WaterexpenseComponent;
  let fixture: ComponentFixture<WaterexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaterexpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
