import {Component, Input, OnInit} from '@angular/core';
import {UserResultOfQuestion} from '../models/userResultOfQuestion';
import {Answer} from '../models/answer';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

    @Input() result: UserResultOfQuestion[];
    numberOfCorrectAnswers = 0;

    constructor() {
    }

    ngOnInit() {
        this.result.forEach(entry => {
            if (entry.userAnswer.isCorrect) {
                this.numberOfCorrectAnswers++;
            }
        });
    }

    returnCorrectAnswer(answers: Answer[]) {
        return answers.find(answer => answer.isCorrect);
    }
}
