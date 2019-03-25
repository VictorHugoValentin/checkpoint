import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionesPage } from './valoraciones.page';

describe('ValoracionesPage', () => {
  let component: ValoracionesPage;
  let fixture: ComponentFixture<ValoracionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoracionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoracionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
