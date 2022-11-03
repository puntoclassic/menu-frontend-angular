import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoNegatoPageComponent } from './accesso-negato-page.component';

describe('AccessoNegatoPageComponent', () => {
  let component: AccessoNegatoPageComponent;
  let fixture: ComponentFixture<AccessoNegatoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoNegatoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoNegatoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
