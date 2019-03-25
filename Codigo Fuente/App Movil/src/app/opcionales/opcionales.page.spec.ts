import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionalesPage } from './opcionales.page';

describe('OpcionalesPage', () => {
  let component: OpcionalesPage;
  let fixture: ComponentFixture<OpcionalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionalesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
