import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarLeftComponent } from './topbar-left.component';

describe('TopbarLeftComponent', () => {
  let component: TopbarLeftComponent;
  let fixture: ComponentFixture<TopbarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
