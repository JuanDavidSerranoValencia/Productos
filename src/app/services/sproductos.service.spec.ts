import { TestBed } from '@angular/core/testing';

import { SProductosService } from './sproductos.service';

describe('SProductosService', () => {
  let service: SProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
