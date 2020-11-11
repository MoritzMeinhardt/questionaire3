import { Injectable } from '@angular/core';
import { QuestionAndAnswers } from '../models/questionAndAnswers';
import { Answer } from '../models/answer';
import { Questionnaire } from '../models/questionnaire.model';
import { isFalsyAnswered } from './score-calculation.service';

@Injectable({
  providedIn: 'root'
})
export class FormToUserResultService {

  constructor() { }

    mapFormToUserResult(plainAnswers: Array<boolean[]>, topic: Questionnaire): QuestionAndAnswers[] {
        const result = [];
        for (let i = 0; i < topic.questionAndAnswers.length; i++) {
            const currentQuestion = topic.questionAndAnswers[i];
            currentQuestion.answers = this.createUserAnswers(plainAnswers[i], currentQuestion.answers);
            result.push(currentQuestion);
        }
      return result;
    }

    private createUserAnswers(userInput: boolean[], answers: Answer[]): Answer[] {
      const result: Answer[] = [];
        for (let i = 0; i < answers.length; i++) {
            const currentAnswer = answers[i];
            currentAnswer.checkedByUser = userInput[i];
            currentAnswer.answeredCorrectly = !isFalsyAnswered(currentAnswer);
            result.push(currentAnswer);
        }
      return result;
    }
}
