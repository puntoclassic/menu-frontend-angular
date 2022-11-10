import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformazioniPersonaliPageComponent } from './informazioni-personali-page.component';

describe('InformazioniPersonaliPageComponent', () => {
  let component: InformazioniPersonaliPageComponent;
  let fixture: ComponentFixture<InformazioniPersonaliPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformazioniPersonaliPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformazioniPersonaliPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
