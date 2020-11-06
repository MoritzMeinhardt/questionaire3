import { Injectable } from '@angular/core';
import { questions} from "../../assets/question-data";
import { Question } from "../models/question";
import { Answer } from "../models/answer";

@Injectable({
  providedIn: 'root'
})
export class QuestionProviderService {

  defaultAnswer: Answer = new Answer();

  constructor() {
    this.defaultAnswer.text = 'I don\'t know';
    this.defaultAnswer.isCorrect = false;
  }

  getQuestions(): Question[] {
    const splittedText = this.splitTextIntoLines(questions);
    return this.createQuestions(splittedText);
  }

  splitTextIntoLines(text: string): string[] {
    return text.split(/\r?\n/);
  }

  createQuestions(splittedText) {
    let questions: Question [] = [];
    let question: Question = null;
    splittedText.forEach(lineOfText => {
      if(lineOfText.startsWith('?')){
        if (question) {
          question.answers.push(this.defaultAnswer);
          questions.push(question);
          question = null;
        }
        question = new Question();
        question.text = lineOfText.substring(1);
      } else {
        let answer: Answer = new Answer();
        if(lineOfText.startsWith('*')) {
          answer.isCorrect = true;
          lineOfText = lineOfText.substring(1);
        }
        answer.text = lineOfText;
        question.answers.push(answer);
      }
    });
    if (question) {
      question.answers.push(this.defaultAnswer);
      questions.push(question);
    }
    return questions;
  }
}
