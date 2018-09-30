import { TestBed } from '@angular/core/testing';

import { SolvService } from './solv.service';

describe('SolvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolvService = TestBed.get(SolvService);
    expect(service).toBeTruthy();
  });
});
