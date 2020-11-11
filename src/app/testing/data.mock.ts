import { QuestionAndAnswers } from '../models/questionAndAnswers';
import { DEFAULT_ANSWER } from '../constants/question.constant';

export class DataMock {
    static getQuestionAndAnswers(): QuestionAndAnswers[] {
        return [
            {
                answers: [
                    {
                        text: 'Ant',
                        isCorrect: false,
                        checkedByUser: null,
                    },
                    {
                        text: 'Bee',
                        isCorrect: false,
                        checkedByUser: null,
                    },
                    {
                        text: 'Cat',
                        isCorrect: true,
                        checkedByUser: null,
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
                        checkedByUser: null,
                    },
                    {
                        text: '5',
                        isCorrect: true,
                        checkedByUser: null,
                    },
                    {
                        text: '6',
                        isCorrect: false,
                        checkedByUser: null,
                    },
                    DEFAULT_ANSWER
                ],
                text: 'What is the sum of 2+3?',
            },
            {
                answers: [
                    {
                        text: 'more',
                        isCorrect: true,
                        checkedByUser: null,
                    },
                    {
                        text: 'than',
                        isCorrect: true,
                        checkedByUser: null,
                    },
                    {
                        text: 'you',
                        isCorrect: true,
                        checkedByUser: null,
                    },
                    DEFAULT_ANSWER
                ],
                text: 'What is multiple possible?',
            },
        ];
    }

    static getUserResultOfQuestionAllAnsweredCorrectly(): QuestionAndAnswers[] {
        return [
            {
                ...this.getQuestionAndAnswers()[ 0 ],
                answers: [
                    ...this.getQuestionAndAnswers()[ 0 ].answers.map(answer => {
                        answer.isCorrect ? answer.checkedByUser = true : answer.checkedByUser = null;
                        return answer;
                    })
                ]
            },
            {
                ...this.getQuestionAndAnswers()[ 1 ],
                answers: [
                    ...this.getQuestionAndAnswers()[ 1 ].answers.map(answer => {
                        answer.isCorrect ? answer.checkedByUser = true : answer.checkedByUser = null;
                        return answer;
                    })
                ]
            },
            {
                ...this.getQuestionAndAnswers()[ 2 ],
                answers: [
                    ...this.getQuestionAndAnswers()[ 2 ].answers.map(answer => {
                        answer.isCorrect ? answer.checkedByUser = true : answer.checkedByUser = null;
                        return answer;
                    })
                ]
            }
        ];
    }

    static getUserResultOfQuestionAllAnsweredFalse(): QuestionAndAnswers[] {
        return [
            {
                ...this.getQuestionAndAnswers()[ 0 ],
                answers: [
                    ...this.getQuestionAndAnswers()[ 0 ].answers.map(answer => {
                        answer.isCorrect ? answer.checkedByUser = false : answer.checkedByUser = null;
                        return answer;
                    })
                ]
            },
            {
                ...this.getQuestionAndAnswers()[ 1 ],
                answers: [
                    ...this.getQuestionAndAnswers()[ 1 ].answers.map(answer => {
                        !answer.isCorrect ? answer.checkedByUser = true : answer.checkedByUser = null;
                        return answer;
                    })
                ]
            },
            this.getQuestionAndAnswers()[ 2 ],
        ];
    }
}
