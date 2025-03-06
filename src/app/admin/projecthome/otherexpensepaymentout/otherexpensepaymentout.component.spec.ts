import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherexpensepaymentoutComponent } from './otherexpensepaymentout.component';

describe('OtherexpensepaymentoutComponent', () => {
  let component: OtherexpensepaymentoutComponent;
  let fixture: ComponentFixture<OtherexpensepaymentoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherexpensepaymentoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherexpensepaymentoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
