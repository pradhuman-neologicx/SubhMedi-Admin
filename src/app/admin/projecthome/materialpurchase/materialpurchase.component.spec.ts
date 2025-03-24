import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialpurchaseComponent } from './materialpurchase.component';

describe('MaterialpurchaseComponent', () => {
  let component: MaterialpurchaseComponent;
  let fixture: ComponentFixture<MaterialpurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialpurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialpurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
