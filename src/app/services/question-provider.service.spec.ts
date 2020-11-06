import {TestBed} from '@angular/core/testing';
import {QuestionProviderService} from './question-provider.service';
import {QuestionAndAnswers} from '../models/questionAndAnswers';
import {Answer} from '../models/answer';

describe('QuestionProviderService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should create correct QUESTIONS', () => { // TODO encapsulate test input data from real input data
        const service: QuestionProviderService = TestBed.get(QuestionProviderService);
        const q1 = new QuestionAndAnswers();
        const q1a1 = new Answer();
        const q1a2 = new Answer();
        const q1a3 = new Answer();
        const q2 = new QuestionAndAnswers();
        const q2a1 = new Answer();
        const q2a2 = new Answer();
        const q2a3 = new Answer();

        q1.text = 'Which of these animals is a mammal';
        q1a1.text = 'Ant';
        q1a2.text = 'Bee';
        q1a3.text = 'Cat';
        q1a3.isCorrect = true;
        q1.answers = [q1a1, q1a2, q1a3];

        q2.text = 'What is the sum of 2+3';
        q2a1.text = '2';
        q2a2.text = '5';
        q2a2.isCorrect = true;
        q2a3.text = '6';
        q2.answers = [q2a1, q2a2, q2a3];

        expect(service.getQuestions()).toEqual([q1, q2]);
    });

    describe('', () => {
        // TODO: Implement
    });
});
