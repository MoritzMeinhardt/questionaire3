import { TestBed } from '@angular/core/testing';

import { ScoreCalculationService } from './score-calculation.service';

describe('ScoreCalculationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreCalculationService = TestBed.get(ScoreCalculationService);
    expect(service).toBeTruthy();
  });
});
