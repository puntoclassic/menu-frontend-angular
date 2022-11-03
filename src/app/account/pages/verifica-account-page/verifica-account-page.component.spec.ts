import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificaAccountPageComponent } from './verifica-account-page.component';

describe('VerificaAccountPageComponent', () => {
  let component: VerificaAccountPageComponent;
  let fixture: ComponentFixture<VerificaAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificaAccountPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificaAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
