import { TestBed } from '@angular/core/testing';

import { UtilsFormsService } from './utils-forms.service';

describe('UtilsFormsService', () => {
  let service: UtilsFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
