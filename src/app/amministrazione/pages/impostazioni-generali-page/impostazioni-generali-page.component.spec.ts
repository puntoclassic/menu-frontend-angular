import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostazioniGeneraliPageComponent } from './impostazioni-generali-page.component';

describe('ImpostazioniGeneraliPageComponent', () => {
  let component: ImpostazioniGeneraliPageComponent;
  let fixture: ComponentFixture<ImpostazioniGeneraliPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpostazioniGeneraliPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpostazioniGeneraliPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
