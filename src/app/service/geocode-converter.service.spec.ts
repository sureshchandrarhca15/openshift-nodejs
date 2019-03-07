import { TestBed } from '@angular/core/testing';

import { GeocodeConverterService } from './service/geocode-converter.service';

describe('GeocodeConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeocodeConverterService = TestBed.get(GeocodeConverterService);
    expect(service).toBeTruthy();
  });
});
