import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Questionnaire } from '../../../models/questionnaire.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserResult } from '../../../models/userResult';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: [ './quiz.component.css' ]
})
export class QuizComponent implements OnInit {

    @Input() topic: Questionnaire;
    @Output() submittedResult: EventEmitter<UserResult[]> = new EventEmitter();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        console.log(this.topic);
        this.form = this.initForm();


    }

    onSubmit() {
        console.log(this.form);
        this.submittedResult.emit([]);
    }

    private initForm(): FormGroup {
        const rootForm = this.fb.group({

        });

        return rootForm;
    }

}
