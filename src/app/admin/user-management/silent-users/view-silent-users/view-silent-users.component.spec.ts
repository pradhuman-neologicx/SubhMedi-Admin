import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSilentUsersComponent } from './view-silent-users.component';

describe('ViewSilentUsersComponent', () => {
  let component: ViewSilentUsersComponent;
  let fixture: ComponentFixture<ViewSilentUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSilentUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSilentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
