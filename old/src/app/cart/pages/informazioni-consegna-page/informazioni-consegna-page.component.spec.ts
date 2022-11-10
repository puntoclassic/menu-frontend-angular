import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformazioniConsegnaPageComponent } from './informazioni-consegna-page.component';

describe('InformazioniConsegnaPageComponent', () => {
  let component: InformazioniConsegnaPageComponent;
  let fixture: ComponentFixture<InformazioniConsegnaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformazioniConsegnaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformazioniConsegnaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
