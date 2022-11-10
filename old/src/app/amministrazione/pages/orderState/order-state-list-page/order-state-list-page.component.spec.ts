import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateListPageComponent } from './order-state-list-page.component';

describe('OrderStateListPageComponent', () => {
  let component: OrderStateListPageComponent;
  let fixture: ComponentFixture<OrderStateListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStateListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStateListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
