import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeattendanceComponent } from './homeattendance.component';

describe('HomeattendanceComponent', () => {
  let component: HomeattendanceComponent;
  let fixture: ComponentFixture<HomeattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeattendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
