import { Component, OnInit } from '@angular/core';
import { QuestionProviderService } from "../services/question-provider.service";
import { Question } from "../models/question";
import { UserResultOfQuestion } from "../models/userResultOfQuestion";
import { Answer } from "../models/answer";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  viewResult: boolean = false;
  questions: Question[];
  result: UserResultOfQuestion[] = [];

  constructor(private questionProvider: QuestionProviderService) { }

  ngOnInit() {
    this.questions = this.questionProvider.getQuestions();
  }

  onUserFeedback(answer: Answer, question: Question) {
    let userResult = new UserResultOfQuestion();
    userResult.question = question;
    userResult.userAnswer = answer;
    let alreadyAnsweredQuestion = this.result.find(entry => entry.question == question);
    if(alreadyAnsweredQuestion) {
      this.result.splice(this.result.findIndex(entry => entry.question == question), 1);
    }
    this.result.push(userResult);
  }

  submit() {
    this.viewResult = !this.viewResult;
  }
}
