import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordTokenPageComponent } from './reset-password-token-page.component';

describe('ResetPasswordTokenPageComponent', () => {
  let component: ResetPasswordTokenPageComponent;
  let fixture: ComponentFixture<ResetPasswordTokenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordTokenPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordTokenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
