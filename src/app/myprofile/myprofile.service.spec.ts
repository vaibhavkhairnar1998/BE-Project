import { TestBed } from '@angular/core/testing';

import { MyprofileService } from './myprofile.service';

describe('MyprofileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyprofileService = TestBed.get(MyprofileService);
    expect(service).toBeTruthy();
  });
});
