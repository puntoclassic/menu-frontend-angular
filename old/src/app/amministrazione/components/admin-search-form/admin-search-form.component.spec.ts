import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSearchFormComponent } from './admin-search-form.component';

describe('AdminSearchFormComponent', () => {
  let component: AdminSearchFormComponent;
  let fixture: ComponentFixture<AdminSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
