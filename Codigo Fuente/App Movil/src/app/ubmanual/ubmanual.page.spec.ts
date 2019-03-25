import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbmanualPage } from './ubmanual.page';

describe('UbmanualPage', () => {
  let component: UbmanualPage;
  let fixture: ComponentFixture<UbmanualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbmanualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbmanualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
