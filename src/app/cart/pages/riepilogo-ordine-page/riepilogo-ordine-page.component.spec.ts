import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoOrdinePageComponent } from './riepilogo-ordine-page.component';

describe('RiepilogoOrdinePageComponent', () => {
  let component: RiepilogoOrdinePageComponent;
  let fixture: ComponentFixture<RiepilogoOrdinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiepilogoOrdinePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiepilogoOrdinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
