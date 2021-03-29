import { TestBed } from '@angular/core/testing';

import { ContestDetailService } from './contest-detail.service';

describe('ContestDetailService', () => {
  let service: ContestDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
