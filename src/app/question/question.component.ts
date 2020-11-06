import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from "../models/question";
import { Answer } from "../models/answer";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() answerGiven: EventEmitter<Answer> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(answer) {
    this.answerGiven.emit(answer);
  }

}
