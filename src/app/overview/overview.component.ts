import { Component, OnInit } from '@angular/core';
import { QuestionProviderService } from '../services/question-provider.service';
import { QuestionAndAnswers } from '../models/questionAndAnswers';
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
    userResults: QuestionAndAnswers[] = [];

    form = new FormGroup({});

    constructor(
        private questionProvider: QuestionProviderService,
        private scoreCalculationService: ScoreCalculationService,
    ) {}

    ngOnInit() { }

    onUserFeedback(answer: Answer, question: QuestionAndAnswers) {
    }

    submit() {
        this.showScore = !this.showScore;
    }

    onUserResultSubmitted(userResult: QuestionAndAnswers[]) {
        this.score = this.scoreCalculationService.calculateScore(userResult);
        this.userResults = userResult;
        this.showScore = true;
    }
}
