import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscelaniousexpensesComponent } from './miscelaniousexpenses.component';

describe('MiscelaniousexpensesComponent', () => {
  let component: MiscelaniousexpensesComponent;
  let fixture: ComponentFixture<MiscelaniousexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiscelaniousexpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscelaniousexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
