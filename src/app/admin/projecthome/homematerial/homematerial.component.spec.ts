import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomematerialComponent } from './homematerial.component';

describe('HomematerialComponent', () => {
  let component: HomematerialComponent;
  let fixture: ComponentFixture<HomematerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomematerialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomematerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
