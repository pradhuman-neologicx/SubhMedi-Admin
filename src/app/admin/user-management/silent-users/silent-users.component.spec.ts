import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilentUsersComponent } from './silent-users.component';

describe('SilentUsersComponent', () => {
  let component: SilentUsersComponent;
  let fixture: ComponentFixture<SilentUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SilentUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
