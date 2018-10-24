import { TestBed } from '@angular/core/testing';

import { SolvDbService } from './solv-db.service';

describe('SolvDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolvDbService = TestBed.get(SolvDbService);
    expect(service).toBeTruthy();
  });
});
