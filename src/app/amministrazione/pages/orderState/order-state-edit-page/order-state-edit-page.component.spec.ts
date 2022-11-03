import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateEditPageComponent } from './order-state-edit-page.component';

describe('OrderStateEditPageComponent', () => {
  let component: OrderStateEditPageComponent;
  let fixture: ComponentFixture<OrderStateEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStateEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
