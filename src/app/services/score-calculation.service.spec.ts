import { TestBed } from '@angular/core/testing';

import { ScoreCalculationService } from './score-calculation.service';
import { Score } from '../models/score.model';
import { DataMock } from '../testing/data.mock';

fdescribe('ScoreCalculationService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ScoreCalculationService = TestBed.get(ScoreCalculationService);
        expect(service).toBeTruthy();
    });

    fit('should calculate correct when all questions are correct answered', () => {
        const service: ScoreCalculationService = TestBed.get(ScoreCalculationService);

        const expected = new Score(DataMock.getUserResultOfQuestionAllAnsweredCorrectly().length, DataMock.getUserResultOfQuestionAllAnsweredCorrectly().length);
        const actual = service.calculateScore(DataMock.getUserResultOfQuestionAllAnsweredCorrectly());

        expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
    });

    fit('should calculate correct when all questions are wrong answered', () => {
        const service: ScoreCalculationService = TestBed.get(ScoreCalculationService);

        const expected = new Score(DataMock.getUserResultOfQuestionAllAnsweredCorrectly().length, 0);
        const actual = service.calculateScore(DataMock.getUserResultOfQuestionAllAnsweredFalse());

        expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
    })
});
