import { Component, Input, OnInit } from '@angular/core';
import { UserResult } from '../models/userResult';
import { Answer } from '../models/answer';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

    @Input() userResults: UserResult[];
    public score = 0;

    ngOnInit() {
        this.score = this.countCorrectAnswers(this.userResults);
    }

    private countCorrectAnswers(userResults: UserResult[]): number {
        return userResults.filter(entry => entry.userAnswers.isCorrect).length;
    }

    returnCorrectAnswer(answers: Answer[]): Answer {
        return answers.find(answer => answer.isCorrect);
    }
}
