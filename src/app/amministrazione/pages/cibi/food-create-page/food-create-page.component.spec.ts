import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCreatePageComponent } from './food-create-page.component';

describe('FoodCreatePageComponent', () => {
  let component: FoodCreatePageComponent;
  let fixture: ComponentFixture<FoodCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
