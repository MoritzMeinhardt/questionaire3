import { Injectable } from '@angular/core';
import { Score } from '../models/score.model';
import { QuestionAndAnswers } from '../models/questionAndAnswers';
import { Answer } from '../models/answer';

@Injectable({
    providedIn: 'root'
})
export class ScoreCalculationService {

    constructor() {
    }

    calculateScore(userResult: QuestionAndAnswers[]): Score {
        const correctlyAnsweredQuestions = userResult.filter(question => isQuestionAnsweredCorrectly(question));
        return new Score(userResult.length, correctlyAnsweredQuestions.length);
    }
}

export function isQuestionAnsweredCorrectly(question: QuestionAndAnswers): boolean {
    return question.answers.filter(answer => (isFalsyAnswered(answer))).length === 0; // if no answer is wrong the question is correct
}

export function isFalsyAnswered(answer: Answer) {
    return isCorrectButNotCheckedByUser(answer.isCorrect, answer.checkedByUser)
        || isNotCorrectButCheckedByUser(answer.isCorrect, answer.checkedByUser);
}

function isCorrectButNotCheckedByUser(isCorrect: boolean, isCheckedByUser: boolean): boolean {
    return (isCorrect && !isCheckedByUser);
}

function isNotCorrectButCheckedByUser(isCorrect: boolean, isCheckedByUser: boolean): boolean {
    return (!isCorrect && isCheckedByUser);
}
