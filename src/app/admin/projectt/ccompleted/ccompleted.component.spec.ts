import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcompletedComponent } from './ccompleted.component';

describe('CcompletedComponent', () => {
  let component: CcompletedComponent;
  let fixture: ComponentFixture<CcompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
