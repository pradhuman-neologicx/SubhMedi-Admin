import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OongoingComponent } from './oongoing.component';

describe('OongoingComponent', () => {
  let component: OongoingComponent;
  let fixture: ComponentFixture<OongoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OongoingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OongoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
