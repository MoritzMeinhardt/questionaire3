import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionAndAnswers} from '../models/questionAndAnswers';
import {Answer} from '../models/answer';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent {

    @Input() question: QuestionAndAnswers;
    @Output() answerGiven: EventEmitter<Answer> = new EventEmitter();

    onSelect(answer) {
        this.answerGiven.emit(answer);
    }

}
