import {Answer} from './answer';
import {QuestionAndAnswers} from './questionAndAnswers';

export class UserResult {
    questionAndAnswers: QuestionAndAnswers;
    userAnswers: Answer[];

    constructor(question: QuestionAndAnswers, userAnswers: Answer[]) {
        this.questionAndAnswers = question;
        this.userAnswers = userAnswers;
    }
}
