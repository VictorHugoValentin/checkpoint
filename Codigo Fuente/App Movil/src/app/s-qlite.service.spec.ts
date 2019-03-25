import { TestBed } from '@angular/core/testing';

import { SQliteService } from './s-qlite.service';

describe('SQliteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SQliteService = TestBed.get(SQliteService);
    expect(service).toBeTruthy();
  });
});
