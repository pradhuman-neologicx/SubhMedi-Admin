import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepartiesComponent } from './homeparties.component';

describe('HomepartiesComponent', () => {
  let component: HomepartiesComponent;
  let fixture: ComponentFixture<HomepartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepartiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
