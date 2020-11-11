import {TestBed} from '@angular/core/testing';
import {QuestionProviderService} from './question-provider.service';
import {QuestionAndAnswers} from '../models/questionAndAnswers';
import {DataMock} from '../testing/data.mock';

describe('QuestionProviderService', () => {
    let questionProviderService: QuestionProviderService;

    beforeEach(() => TestBed.configureTestingModule({}));

    beforeEach(() => {
        questionProviderService = TestBed.get(QuestionProviderService);
    });

    it('should create correct QUESTIONS', () => {
        const expectedQuestionnaire: QuestionAndAnswers[] = getExpectedQuestionAndAnswers();
        const actualQuestionnaire: QuestionAndAnswers[] = questionProviderService.getQuestions();
        expect(JSON.stringify(actualQuestionnaire)).toEqual(JSON.stringify(expectedQuestionnaire));
    });
});

function getExpectedQuestionAndAnswers(): QuestionAndAnswers[] {
    return DataMock.getQuestionAndAnswers();
}
