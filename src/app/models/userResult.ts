import { QuestionAndAnswers } from './questionAndAnswers';

export class UserResult {
    questionAndAnswers: QuestionAndAnswers;

    constructor(question: QuestionAndAnswers) {
        this.questionAndAnswers = question;
    }
}
