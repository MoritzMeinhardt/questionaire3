import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Questionnaire } from '../../../models/questionnaire.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { QuestionAndAnswers } from '../../../models/questionAndAnswers';
import { FormToUserResultService } from '../../../services/form-to-user-result.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: [ './quiz.component.css' ]
})
export class QuizComponent implements OnInit {

    @Input() topic: Questionnaire;
    @Output() submittedResult: EventEmitter<QuestionAndAnswers[]> = new EventEmitter();

    form: FormGroup;

    constructor(private formToUserResult: FormToUserResultService) {
    }

    ngOnInit() {
        this.form = this.initForm(this.topic.questionAndAnswers);
    }

    onSubmit() {
        this.submittedResult.emit(this.formToUserResult.mapFormToUserResult(this.form.controls[this.topic.topic].value, this.topic));
    }

    private initForm(questionAndAnswersArray: QuestionAndAnswers[]): FormGroup {
        const rootForm = new FormGroup({});
        const questionControls = [];

        for (let i = 0; i < questionAndAnswersArray.length; i++) {
            const currentQuestionAndAnswer = questionAndAnswersArray[i];
            const answerFormControls = this.createNumberOfControlsAndPushIntoFormArray(currentQuestionAndAnswer.answers.length);
            questionControls.push(answerFormControls);
        }
        rootForm.addControl(this.topic.topic, new FormArray(questionControls));
        return rootForm;
    }

    private createNumberOfControlsAndPushIntoFormArray(number: number): FormArray {
        const controls = [];
        for (let i = 0; i < number; i++) {
            controls.push(new FormControl());
        }
        return new FormArray(controls);
    }
}
