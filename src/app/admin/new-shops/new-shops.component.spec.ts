import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShopsComponent } from './new-shops.component';

describe('NewShopsComponent', () => {
  let component: NewShopsComponent;
  let fixture: ComponentFixture<NewShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewShopsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
