import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecthomeComponent } from './projecthome.component';

describe('ProjecthomeComponent', () => {
  let component: ProjecthomeComponent;
  let fixture: ComponentFixture<ProjecthomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjecthomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjecthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
