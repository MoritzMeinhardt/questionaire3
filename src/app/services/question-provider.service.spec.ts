import {TestBed} from '@angular/core/testing';
import {QuestionProviderService} from './question-provider.service';
import {QuestionAndAnswers} from '../models/questionAndAnswers';
import {DEFAULT_ANSWER} from '../constants/question.constant';

describe('QuestionProviderService', () => {
    let questionProviderService: QuestionProviderService;

    beforeEach(() => TestBed.configureTestingModule({}));

    beforeEach(() => {
        questionProviderService = TestBed.get(QuestionProviderService);
    });

    it('should create correct QUESTIONS', () => {
        const expectedQuestionnaire: QuestionAndAnswers[] = getExpectedQuestionAndAnswers();
        const actualQuestionnaire: QuestionAndAnswers[] = questionProviderService.getQuestions();
        expect(actualQuestionnaire).toEqual(expectedQuestionnaire);
    });

    describe('', () => {
        // TODO: Implement
    });
});

function getExpectedQuestionAndAnswers(): QuestionAndAnswers[] {
    return [
        getFirstQuestionAndAnswer(),
        getSecondQuestionAndAnswer(),
    ];
}

function getFirstQuestionAndAnswer(): QuestionAndAnswers {
    return {
        answers: [
            {
                text: 'Cat',
                isCorrect: true,
            },
            {
                text: 'Ant',
                isCorrect: false,
            },
            {
                text: 'Bee',
                isCorrect: false,
            },
            DEFAULT_ANSWER
        ],
        text: 'Which of these animals is a mammal?',
    };
}

function getSecondQuestionAndAnswer(): QuestionAndAnswers {
    return {
        answers: [
            {
                text: '5',
                isCorrect: true,
            },
            {
                text: '2',
                isCorrect: false,
            },
            {
                text: '6',
                isCorrect: false,
            },
            DEFAULT_ANSWER
        ],
        text: 'What is the sum of 2+3?',
    };
}
