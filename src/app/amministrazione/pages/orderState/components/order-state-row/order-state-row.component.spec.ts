import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateRowComponent } from './order-state-row.component';

describe('OrderStateRowComponent', () => {
  let component: OrderStateRowComponent;
  let fixture: ComponentFixture<OrderStateRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStateRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStateRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
