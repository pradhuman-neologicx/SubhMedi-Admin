import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDistributorsComponent } from './medical-distributors.component';

describe('MedicalDistributorsComponent', () => {
  let component: MedicalDistributorsComponent;
  let fixture: ComponentFixture<MedicalDistributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalDistributorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
