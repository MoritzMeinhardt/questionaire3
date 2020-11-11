import {Component, OnInit} from '@angular/core';
import {QuestionProviderService} from '../services/question-provider.service';
import {QuestionAndAnswers} from '../models/questionAndAnswers';
import {UserResultOfQuestion} from '../models/userResultOfQuestion';
import {Answer} from '../models/answer';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

    viewResult = false;
    questions: QuestionAndAnswers[];
    result: UserResultOfQuestion[] = [];

    constructor(
        private questionProvider: QuestionProviderService
    ) {
    }

    ngOnInit() {
        this.questions = this.questionProvider.getQuestions();
    }

    onUserFeedback(answer: Answer, question: QuestionAndAnswers) {
        const userResult: UserResultOfQuestion = this.createNewUserResultOfQuestion(answer, question);
        const alreadyAnsweredQuestion: boolean = this.isQuestionAlreadyAnswered(question);
        if (alreadyAnsweredQuestion) {
            const questionIndex = this.getQuestionIndex(question);
            this.removeAlreadyAnsweredQuestion(questionIndex);
        }
        this.result.push(userResult);
    }

    private createNewUserResultOfQuestion(answer: Answer, question: QuestionAndAnswers) {
        return new UserResultOfQuestion(question, answer);
    }

    private getQuestionIndex(question: QuestionAndAnswers): number {
        return this.result.findIndex(entry => entry.question === question);
    }

    private isQuestionAlreadyAnswered(question: QuestionAndAnswers): boolean {
        return this.result.find(entry => entry.question === question) !== null;
    }

    private removeAlreadyAnsweredQuestion(questionIndex: number) {
        this.result.splice(questionIndex, 1);
    }

    submit() {
        this.viewResult = !this.viewResult;
    }
}
