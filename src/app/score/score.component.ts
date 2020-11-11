import { Component, Input, OnInit } from '@angular/core';
import { UserResultOfQuestion } from '../models/userResultOfQuestion';
import { Answer } from '../models/answer';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

    @Input() userResults: UserResultOfQuestion[];
    public score = 0;

    ngOnInit() {
        this.score = this.countCorrectAnswers(this.userResults);
    }

    private countCorrectAnswers(userResults: UserResultOfQuestion[]): number {
        return userResults.filter(entry => entry.userAnswer.isCorrect).length;
    }

    returnCorrectAnswer(answers: Answer[]): Answer {
        return answers.find(answer => answer.isCorrect);
    }
}
