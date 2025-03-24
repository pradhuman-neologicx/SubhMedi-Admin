import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppUsersComponent } from './view-app-users.component';

describe('ViewAppUsersComponent', () => {
  let component: ViewAppUsersComponent;
  let fixture: ComponentFixture<ViewAppUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAppUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
