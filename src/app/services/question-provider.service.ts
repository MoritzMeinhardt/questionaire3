import {Injectable} from '@angular/core';
import {QUESTIONS} from '../../assets/question-data';
import {QuestionAndAnswers} from '../models/questionAndAnswers';
import {Answer} from '../models/answer';
import {DEFAULT_ANSWER} from '../constants/question.constant';

@Injectable({
    providedIn: 'root'
})
export class QuestionProviderService {

    readonly QUESTION_SELECTOR = '?';
    readonly CORRECT_ANSWER_SELECTOR = '*';

    getQuestions(): QuestionAndAnswers[] {
        const splittedText: string[] = this.splitTextIntoLines(QUESTIONS);
        const questionAndAnswerBlocks: string [][] = this.getQuestionAndAnswerBlocks(splittedText);
        return this.createQuestions(splittedText);
    }

    private createQuestions(splittedText) {
        const questionnaire: QuestionAndAnswers [] = [];
        let question: QuestionAndAnswers = null;
        splittedText.forEach(lineOfText => {
            if (this.isLineOfTextQuestion(lineOfText)) {
                if (question) {
                    question.answers.push(DEFAULT_ANSWER);
                    questionnaire.push(question);
                    question = null;
                }
                question = new QuestionAndAnswers();
                question.text = lineOfText.substring(1);
            } else {
                const answer: Answer = new Answer();
                if (this.isLineOfTextCorrectAnswer(lineOfText)) {
                    answer.isCorrect = true;
                    lineOfText = lineOfText.substring(1);
                }
                answer.text = lineOfText;
                question.answers.push(answer);
            }
        });
        if (question) {
            question.answers.push(DEFAULT_ANSWER);
            questionnaire.push(question);
        }
        return questionnaire;
    }

    private splitTextIntoLines(text: string): string[] {
        return text.split(/\r?\n/);
    }

    private getQuestionAndAnswerBlocks(splittedText: string[]): string[][] {
        const questionAndAnswerBlocks: string[][] = [];
        let currentQuestionNumber = -1;
        splittedText.forEach(lineOfText => {
            if (this.isLineOfTextQuestion(lineOfText)) {
                currentQuestionNumber++;
            }
            questionAndAnswerBlocks[currentQuestionNumber].push(lineOfText);
        });
        return questionAndAnswerBlocks;
    }

    private isLineOfTextQuestion(lineOfText: string): boolean {
        return this.doesLineStartWithCharacter(lineOfText, this.QUESTION_SELECTOR);
    }

    private isLineOfTextCorrectAnswer(lineOfText: string): boolean {
        return this.doesLineStartWithCharacter(lineOfText, this.CORRECT_ANSWER_SELECTOR);
    }

    private doesLineStartWithCharacter(lineOfText: string, dividingCharacter: string) {
        return lineOfText.startsWith(dividingCharacter);
    }
}
