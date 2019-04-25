import { TestBed } from '@angular/core/testing';

import { HubControlService } from './hub-control.service';

describe('HubControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HubControlService = TestBed.get(HubControlService);
    expect(service).toBeTruthy();
  });
});
