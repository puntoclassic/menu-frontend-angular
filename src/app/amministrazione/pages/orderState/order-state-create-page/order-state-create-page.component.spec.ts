import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateCreatePageComponent } from './order-state-create-page.component';

describe('OrderStateCreatePageComponent', () => {
  let component: OrderStateCreatePageComponent;
  let fixture: ComponentFixture<OrderStateCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStateCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStateCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
