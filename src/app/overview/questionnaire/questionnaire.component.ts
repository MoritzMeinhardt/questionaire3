import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Questionnaire } from '../../models/questionnaire.model';
import { DataMock } from '../../testing/data.mock';
import { UserResult } from '../../models/userResult';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: [ './questionnaire.component.css' ]
})
export class QuestionnaireComponent implements OnInit {

    @Input() questionnaires: Questionnaire[];
    @Output() userResultSubmitted: EventEmitter<UserResult[]> = new EventEmitter();

    selectedTopic: Questionnaire;

    constructor() {
    }

    ngOnInit() {
        this.questionnaires = [
            {topic: 'Bio - Mock', questionAndAnswers: DataMock.getQuestionAndAnswers()},
            {topic: 'IT - Mock', questionAndAnswers: DataMock.getQuestionAndAnswers()},
        ];
        console.warn("Using mocked questionnaire data");
    }

    onTopicSelected(selectedTopic: Questionnaire) {
        this.selectedTopic = selectedTopic;
    }
}
