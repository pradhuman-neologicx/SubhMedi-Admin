import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyexpenseComponent } from './pettyexpense.component';

describe('PettyexpenseComponent', () => {
  let component: PettyexpenseComponent;
  let fixture: ComponentFixture<PettyexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PettyexpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PettyexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
