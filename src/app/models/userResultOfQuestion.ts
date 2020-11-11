import {Answer} from './answer';
import {QuestionAndAnswers} from './questionAndAnswers';

export class UserResultOfQuestion {
    questionAndAnswers: QuestionAndAnswers;
    userAnswer: Answer;

    constructor(question: QuestionAndAnswers, userAnswer: Answer) {
        this.questionAndAnswers = question;
        this.userAnswer = userAnswer;
    }
}
