import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionAndAnswers } from "../models/questionAndAnswers";
import { Answer } from "../models/answer";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: QuestionAndAnswers;
  @Output() answerGiven: EventEmitter<Answer> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(answer) {
    this.answerGiven.emit(answer);
  }

}
