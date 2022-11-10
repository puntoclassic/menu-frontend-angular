import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CassaButtonComponent } from './cassa-button.component';

describe('CassaButtonComponent', () => {
  let component: CassaButtonComponent;
  let fixture: ComponentFixture<CassaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CassaButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CassaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
