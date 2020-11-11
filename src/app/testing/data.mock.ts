import {QuestionAndAnswers} from '../models/questionAndAnswers';
import {DEFAULT_ANSWER} from '../constants/question.constant';
import {UserResult} from '../models/userResult';

export class DataMock {
    static getQuestionAndAnswers(): QuestionAndAnswers[] {
        return [
            {
                answers: [
                    {
                        text: 'Ant',
                        isCorrect: false,
                    },
                    {
                        text: 'Bee',
                        isCorrect: false,
                    },
                    {
                        text: 'Cat',
                        isCorrect: true,
                    },
                    DEFAULT_ANSWER
                ],
                text: 'Which of these animals is a mammal?',
            },
            {
                answers: [
                    {
                        text: '2',
                        isCorrect: false,
                    },
                    {
                        text: '5',
                        isCorrect: true,
                    },
                    {
                        text: '6',
                        isCorrect: false,
                    },
                    DEFAULT_ANSWER
                ],
                text: 'What is the sum of 2+3?',
            },
        ];
    }

    static getUserResultOfQuestion(): UserResult[] {
        return [
            {
                questionAndAnswers: this.getQuestionAndAnswers()[0],
                userAnswers: [
                    {
                        text: 'Cat',
                        isCorrect: true,
                    },
                    {
                        text: 'Dog',
                        isCorrect: true,
                    },
                ]
            },
            {
                questionAndAnswers: this.getQuestionAndAnswers()[1],
                userAnswers: [
                    {
                        text: '5',
                        isCorrect: true,
                    }
                ]
            }
        ];
    }
}
