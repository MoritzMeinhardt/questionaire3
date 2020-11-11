import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Questionnaire } from '../../../models/questionnaire.model';

@Component({
  selector: 'app-choose-topic',
  templateUrl: './choose-topic.component.html',
  styleUrls: ['./choose-topic.component.css']
})
export class ChooseTopicComponent implements OnInit {

    @Input() selectionOfTopics: Questionnaire[];
    @Output() selectedTopic: EventEmitter<Questionnaire> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
