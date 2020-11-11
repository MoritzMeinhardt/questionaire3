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
    readonly NUMBER_OF_QUESTION_SELECTORS = 1;
    readonly NUMBER_OF_CORRECT_ANSWER_SELECTORS = 1;

    getQuestions(): QuestionAndAnswers[] {
        const splittedText: string[] = this.splitTextIntoLines(QUESTIONS);
        const questionAndAnswerBlocks: string [][] = this.getQuestionAndAnswerBlocks(splittedText);
        return this.getQuestionnaire(questionAndAnswerBlocks);
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
        this.addDefaultAnswer(questionAndAnswers);
        this.getAndSetCorrectAnswers(questionAndAnswers, qAndABlock);
        this.getAndSetAlternativeAnswers(questionAndAnswers, qAndABlock);
        return questionAndAnswers;
    }

    private createQandA(): QuestionAndAnswers {
        return new QuestionAndAnswers();
    }

    private getAndSetQuestion(currentQuestionAndAnswers: QuestionAndAnswers, qAndABlock: string []) {
        const questionText = this.getQuestion(qAndABlock);
        this.setQuestionText(currentQuestionAndAnswers, questionText);
    }

    private addDefaultAnswer(currentQuestionAndAnswers: QuestionAndAnswers) {
        currentQuestionAndAnswers.answers.push(DEFAULT_ANSWER);
    }

    private getAndSetCorrectAnswers(currentQuestionAndAnswers: QuestionAndAnswers, qAndABlock: string []) {
        const correctAnswer = this.getCorrectAnswer(qAndABlock);
        currentQuestionAndAnswers.answers.push(correctAnswer);
    }

    private getAndSetAlternativeAnswers(currentQuestionAndAnswers: QuestionAndAnswers, qAndABlock: string []) {
        const alternativeAnswers: Answer[] = this.getAlternativeAnswers(qAndABlock);
        currentQuestionAndAnswers.answers.push(...alternativeAnswers);
    }

    private getQuestion(questionAndAnswerBlock: string []): string {
        const questionTextBlock = questionAndAnswerBlock.filter(entry => entry.startsWith(this.QUESTION_SELECTOR))[0];
        return this.getSubString(questionTextBlock, this.NUMBER_OF_QUESTION_SELECTORS);
    }

    private getCorrectAnswer(questionAndAnswerBlock: string []): Answer {
        const correctAnswerTextBlock = questionAndAnswerBlock.filter(entry => entry.startsWith(this.CORRECT_ANSWER_SELECTOR))[0];
        const answerText = this.getSubString(correctAnswerTextBlock, this.NUMBER_OF_CORRECT_ANSWER_SELECTORS);
        return this.createCorrectAnswer(answerText);
    }

    private createCorrectAnswer(answerText: string) {
        const correctAnswer: Answer = new Answer(answerText);
        correctAnswer.isCorrect = true;
        return correctAnswer;
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

    private createQuestions(splittedText: string[]) {
        const questionnaire: QuestionAndAnswers [] = [];
        let currentQuestionAndAnswers: QuestionAndAnswers = null;
        splittedText.forEach(lineOfText => {
            if (this.isLineOfTextQuestion(lineOfText)) {
                if (currentQuestionAndAnswers) {
                    currentQuestionAndAnswers.answers.push(DEFAULT_ANSWER);
                    questionnaire.push(currentQuestionAndAnswers);
                    currentQuestionAndAnswers = null;
                }
                currentQuestionAndAnswers = new QuestionAndAnswers();
                currentQuestionAndAnswers.text = lineOfText.substring(1);
            } else {
                const answer: Answer = new Answer('');
                if (this.isLineOfTextCorrectAnswer(lineOfText)) {
                    answer.isCorrect = true;
                    lineOfText = lineOfText.substring(1);
                }
                answer.text = lineOfText;
                currentQuestionAndAnswers.answers.push(answer);
            }
        });
        if (currentQuestionAndAnswers) {
            currentQuestionAndAnswers.answers.push(DEFAULT_ANSWER);
            questionnaire.push(currentQuestionAndAnswers);
        }
        return questionnaire;
    }

    private getSubString(textBlock: string, index: number) {
        return textBlock.substring(index);
    }

    private setQuestionText(currentQuestionAndAnswers: QuestionAndAnswers, questionText: string) {
        currentQuestionAndAnswers.text = questionText;
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

    private isLineOfTextCorrectAnswer(lineOfText: string): boolean {
        return this.doesLineStartWithCharacter(lineOfText, this.CORRECT_ANSWER_SELECTOR);
    }

    private doesLineStartWithCharacter(lineOfText: string, dividingCharacter: string) {
        return lineOfText.startsWith(dividingCharacter);
    }
}
