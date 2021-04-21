import { TestBed } from '@angular/core/testing';

import { UploeadFileService } from './uploead-file.service';

describe('UploeadFileService', () => {
  let service: UploeadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploeadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
