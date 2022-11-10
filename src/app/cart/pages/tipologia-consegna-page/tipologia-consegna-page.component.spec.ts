import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipologiaConsegnaPageComponent } from './tipologia-consegna-page.component';

describe('TipologiaConsegnaPageComponent', () => {
  let component: TipologiaConsegnaPageComponent;
  let fixture: ComponentFixture<TipologiaConsegnaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipologiaConsegnaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipologiaConsegnaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
