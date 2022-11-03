import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercaPageComponent } from './cerca-page.component';

describe('CercaPageComponent', () => {
  let component: CercaPageComponent;
  let fixture: ComponentFixture<CercaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CercaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CercaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
