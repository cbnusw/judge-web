import { TestBed } from '@angular/core/testing';

import { JoinService } from './join.service';

describe('JoinService', () => {
  let service: JoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
