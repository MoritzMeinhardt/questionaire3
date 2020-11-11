import { Component, Input, OnInit } from '@angular/core';
import { Answer } from '../../models/answer';
import { Score } from '../../models/score.model';
import { QuestionAndAnswers } from '../../models/questionAndAnswers';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

    @Input() userResults: QuestionAndAnswers[];
    @Input() score: Score;

    ngOnInit() {
    }

    returnCorrectAnswer(answers: Answer[]): Answer {
        return answers.find(answer => answer.isCorrect);
    }
}
