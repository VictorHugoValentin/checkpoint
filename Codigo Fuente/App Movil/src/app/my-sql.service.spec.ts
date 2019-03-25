import { TestBed } from '@angular/core/testing';

import { MySqlService } from './my-sql.service';

describe('MySqlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MySqlService = TestBed.get(MySqlService);
    expect(service).toBeTruthy();
  });
});
