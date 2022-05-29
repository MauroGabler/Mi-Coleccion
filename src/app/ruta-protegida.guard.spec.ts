import { TestBed } from '@angular/core/testing';

import { RutaProtegidaGuard } from './ruta-protegida.guard';

describe('RutaProtegidaGuard', () => {
  let guard: RutaProtegidaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RutaProtegidaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
