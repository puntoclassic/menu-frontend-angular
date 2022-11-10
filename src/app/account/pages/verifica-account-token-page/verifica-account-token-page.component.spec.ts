import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificaAccountTokenPageComponent } from './verifica-account-token-page.component';

describe('VerificaAccountTokenPageComponent', () => {
  let component: VerificaAccountTokenPageComponent;
  let fixture: ComponentFixture<VerificaAccountTokenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificaAccountTokenPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificaAccountTokenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
