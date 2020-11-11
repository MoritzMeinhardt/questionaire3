import {Answer} from './answer';
import {QuestionAndAnswers} from './questionAndAnswers';

export class UserResultOfQuestion {
    question: QuestionAndAnswers;
    userAnswer: Answer;

    constructor(question: QuestionAndAnswers, userAnswer: Answer) {
        this.question = question;
        this.userAnswer = userAnswer;
    }
}
