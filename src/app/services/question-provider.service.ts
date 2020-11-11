import { Injectable } from '@angular/core';
import { QUESTIONS } from '../../assets/question-data';
import { QuestionAndAnswers } from '../models/questionAndAnswers';
import { Answer } from '../models/answer';
import { DEFAULT_ANSWER } from '../constants/question.constant';

@Injectable({
    providedIn: 'root'
})
export class QuestionProviderService {

    readonly QUESTION_SELECTOR = '?';
    readonly CORRECT_ANSWER_SELECTOR = '*';
    readonly NUMBER_OF_QUESTION_SELECTORS = 1;
    readonly NUMBER_OF_CORRECT_ANSWER_SELECTORS = 1;
    readonly NUMBER_OF_QUESTIONS_IN_ARRAY = 1;

    getQuestions(): QuestionAndAnswers[] {
        const splittedText: string[] = this.splitTextIntoLines(QUESTIONS);
        const questionAndAnswerBlocks: string [][] = this.getQuestionAndAnswerBlocks(splittedText);
        return this.getQuestionnaire(questionAndAnswerBlocks);
    }

    private splitTextIntoLines(text: string): string[] {
        return text.split(/\r?\n/);
    }

    private getQuestionAndAnswerBlocks(splittedText: string[]): string[][] {
        const questionAndAnswerBlocks: string[][] = [];
        let currentQuestionNumber = -1;
        splittedText.forEach(lineOfText => {
            if (this.isLineOfTextQuestion(lineOfText)) {
                questionAndAnswerBlocks.push([]);
                currentQuestionNumber++;
            }
            questionAndAnswerBlocks[currentQuestionNumber].push(lineOfText);
        });
        return questionAndAnswerBlocks;
    }

    private isLineOfTextQuestion(lineOfText: string): boolean {
        return this.doesLineStartWithCharacter(lineOfText, this.QUESTION_SELECTOR);
    }

    private doesLineStartWithCharacter(lineOfText: string, dividingCharacter: string) {
        return lineOfText.startsWith(dividingCharacter);
    }

    private getQuestionnaire(questionAndAnswerBlocks: string [][]): QuestionAndAnswers[] {
        const questionnaire: QuestionAndAnswers [] = [];
        questionAndAnswerBlocks.forEach(qAndABlock => {
            const currentQuestionAndAnswers: QuestionAndAnswers = this.getQuestionAndAnswersFromStringBlock(qAndABlock);
            questionnaire.push(currentQuestionAndAnswers);
        });
        return questionnaire;
    }

    private getQuestionAndAnswersFromStringBlock(qAndABlock: string[]): QuestionAndAnswers {
        const questionAndAnswers: QuestionAndAnswers = this.createQandA();
        this.getAndSetQuestion(questionAndAnswers, qAndABlock);
        this.getAndSetAlternativeAnswers(questionAndAnswers, qAndABlock);
        this.addDefaultAnswer(questionAndAnswers);
        this.getAndSetCorrectAnswers(questionAndAnswers, qAndABlock);
        return questionAndAnswers;
    }

    private createQandA(): QuestionAndAnswers {
        return new QuestionAndAnswers();
    }

    private getAndSetQuestion(currentQuestionAndAnswers: QuestionAndAnswers, qAndABlock: string []) {
        const questionText = this.getQuestion(qAndABlock);
        this.setQuestionText(currentQuestionAndAnswers, questionText);
    }

    private getQuestion(questionAndAnswerBlock: string []): string {
        const questionTextBlock = questionAndAnswerBlock.filter(entry => entry.startsWith(this.QUESTION_SELECTOR))[ 0 ];
        return this.getSubString(questionTextBlock, this.NUMBER_OF_QUESTION_SELECTORS);
    }

    private setQuestionText(currentQuestionAndAnswers: QuestionAndAnswers, questionText: string) {
        currentQuestionAndAnswers.text = questionText + '?';
    }

    private getAndSetCorrectAnswers(currentQuestionAndAnswers: QuestionAndAnswers, qAndABlock: string []) {
        const correctAnswer = this.getCorrectAnswer(qAndABlock);
        const insertionIndex = this.getCorrectAnswerIndex(qAndABlock);
        currentQuestionAndAnswers.answers.splice(insertionIndex, 0, correctAnswer);
    }

    private getCorrectAnswer(questionAndAnswerBlock: string []): Answer {
        const correctAnswerTextBlock = questionAndAnswerBlock.filter(entry => entry.startsWith(this.CORRECT_ANSWER_SELECTOR))[ 0 ];
        const answerText = this.getSubString(correctAnswerTextBlock, this.NUMBER_OF_CORRECT_ANSWER_SELECTORS);
        return this.createCorrectAnswer(answerText);
    }

    private getCorrectAnswerIndex(questionAndAnswerBlock: string []): number {
        return questionAndAnswerBlock.findIndex(entry => entry.startsWith(this.CORRECT_ANSWER_SELECTOR))
            - this.NUMBER_OF_QUESTIONS_IN_ARRAY;
    }

    private createCorrectAnswer(answerText: string) {
        const correctAnswer: Answer = new Answer(answerText);
        correctAnswer.isCorrect = true;
        return correctAnswer;
    }

    private getAndSetAlternativeAnswers(currentQuestionAndAnswers: QuestionAndAnswers, qAndABlock: string []) {
        const alternativeAnswers: Answer[] = this.getAlternativeAnswers(qAndABlock);
        currentQuestionAndAnswers.answers.push(...alternativeAnswers);
    }

    private getAlternativeAnswers(questionAndAnswerBlock: string []): Answer[] {
        const alternativeAnswers: Answer[] = [];
        const alternativeAnswerTexts = questionAndAnswerBlock.filter(entry => {
            return !entry.startsWith(this.CORRECT_ANSWER_SELECTOR) && !entry.startsWith(this.QUESTION_SELECTOR);
        });
        alternativeAnswerTexts.forEach(answerText => {
            alternativeAnswers.push(new Answer(answerText));
        });
        return alternativeAnswers;
    }

    private addDefaultAnswer(currentQuestionAndAnswers: QuestionAndAnswers) {
        currentQuestionAndAnswers.answers.push(DEFAULT_ANSWER);
    }

    private getSubString(textBlock: string, index: number) {
        return textBlock.substring(index);
    }
}
