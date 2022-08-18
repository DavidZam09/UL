import { TestBed } from '@angular/core/testing';

import { DestService } from './dest.service';

describe('DestService', () => {
  let service: DestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
