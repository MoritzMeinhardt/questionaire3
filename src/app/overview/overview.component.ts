import { Component, OnInit } from '@angular/core';
import { QuestionProviderService } from '../services/question-provider.service';
import { QuestionAndAnswers } from '../models/questionAndAnswers';
import { UserResult } from '../models/userResult';
import { Answer } from '../models/answer';
import { FormGroup } from '@angular/forms';
import { Questionnaire } from '../models/questionnaire.model';
import { ScoreCalculationService } from '../services/score-calculation.service';
import { Score } from '../models/score.model';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

    public showScore = false;
    public score: Score;
    public questionnaires: Questionnaire[];
    userResults: UserResult[] = [];

    form = new FormGroup({});

    constructor(
        private questionProvider: QuestionProviderService,
        private scoreCalculationService: ScoreCalculationService,
    ) {}

    ngOnInit() {
        // this.questionnaires = this.questionProvider.getQuestions());
    }

    onUserFeedback(answer: Answer, question: QuestionAndAnswers) {
        const userResult: UserResult = this.createNewUserResultOfQuestion(answer, question);
        const alreadyAnsweredQuestion: boolean = this.isQuestionAlreadyAnswered(question);
        if (alreadyAnsweredQuestion) {
            const questionIndex = this.getQuestionIndex(question);
            this.removeAlreadyAnsweredQuestion(questionIndex);
        }
        this.userResults.push(userResult);
    }

    private createNewUserResultOfQuestion(answer: Answer, question: QuestionAndAnswers) {
        return new UserResult(question, [answer]);
    }

    private getQuestionIndex(question: QuestionAndAnswers): number {
        return this.userResults.findIndex(entry =>  entry.questionAndAnswers === question);
    }

    private isQuestionAlreadyAnswered(question: QuestionAndAnswers): boolean {
        return this.userResults.find(entry => JSON.stringify(entry.questionAndAnswers) === JSON.stringify(question)) !== undefined;
    }

    private removeAlreadyAnsweredQuestion(questionIndex: number) {
        this.userResults.splice(questionIndex, 1);
    }

    submit() {
        this.showScore = !this.showScore;
    }

    onUserResultSubmitted(userResult: UserResult[]) {
        this.score = this.scoreCalculationService.calculateScore(userResult);
    }
}
