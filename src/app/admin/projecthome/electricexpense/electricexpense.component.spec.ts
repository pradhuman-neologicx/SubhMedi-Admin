import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricexpenseComponent } from './electricexpense.component';

describe('ElectricexpenseComponent', () => {
  let component: ElectricexpenseComponent;
  let fixture: ComponentFixture<ElectricexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectricexpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
