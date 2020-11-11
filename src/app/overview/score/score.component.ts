import { Component, Input, OnInit } from '@angular/core';
import { UserResult } from '../../models/userResult';
import { Answer } from '../../models/answer';
import { Score } from '../../models/score.model';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

    @Input() userResults: UserResult[];
    @Input() score: Score;

    ngOnInit() {
    }

    returnCorrectAnswer(answers: Answer[]): Answer {
        return answers.find(answer => answer.isCorrect);
    }
}
