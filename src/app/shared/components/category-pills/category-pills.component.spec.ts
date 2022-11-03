import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPillsComponent } from './category-pills.component';

describe('CategoryPillsComponent', () => {
  let component: CategoryPillsComponent;
  let fixture: ComponentFixture<CategoryPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
