import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerPageSelectorComponent } from './per-page-selector.component';

describe('PerPageSelectorComponent', () => {
  let component: PerPageSelectorComponent;
  let fixture: ComponentFixture<PerPageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerPageSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerPageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
