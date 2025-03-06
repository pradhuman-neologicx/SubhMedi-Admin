import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectbalanceComponent } from './projectbalance.component';

describe('ProjectbalanceComponent', () => {
  let component: ProjectbalanceComponent;
  let fixture: ComponentFixture<ProjectbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectbalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
