import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrelloContentComponent } from './carrello-content.component';

describe('CarrelloContentComponent', () => {
  let component: CarrelloContentComponent;
  let fixture: ComponentFixture<CarrelloContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrelloContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrelloContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
