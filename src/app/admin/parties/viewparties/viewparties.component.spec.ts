import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpartiesComponent } from './viewparties.component';

describe('ViewpartiesComponent', () => {
  let component: ViewpartiesComponent;
  let fixture: ComponentFixture<ViewpartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewpartiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
