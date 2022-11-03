import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrelloRowComponent } from './carrello-row.component';

describe('CarrelloRowComponent', () => {
  let component: CarrelloRowComponent;
  let fixture: ComponentFixture<CarrelloRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrelloRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrelloRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
