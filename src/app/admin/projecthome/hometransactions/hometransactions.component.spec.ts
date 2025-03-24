import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HometransactionsComponent } from './hometransactions.component';

describe('HometransactionsComponent', () => {
  let component: HometransactionsComponent;
  let fixture: ComponentFixture<HometransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HometransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HometransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
