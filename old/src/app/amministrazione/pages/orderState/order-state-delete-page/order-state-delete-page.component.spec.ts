import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateDeletePageComponent } from './order-state-delete-page.component';

describe('OrderStateDeletePageComponent', () => {
  let component: OrderStateDeletePageComponent;
  let fixture: ComponentFixture<OrderStateDeletePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStateDeletePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStateDeletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
