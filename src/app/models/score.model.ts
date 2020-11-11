export class Score {
    questionCount: number;
    correctlyAnsweredQuestions: number;


    constructor(questionCount: number, correctlyAnsweredQuestions: number) {
        this.questionCount = questionCount;
        this.correctlyAnsweredQuestions = correctlyAnsweredQuestions;
    }
}
