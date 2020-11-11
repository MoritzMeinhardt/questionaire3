import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { ScoreComponent } from './overview/score/score.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChooseTopicComponent } from './overview/questionnaire/choose-topic/choose-topic.component';
import { QuizComponent } from './overview/questionnaire/quiz/quiz.component';
import { QuestionnaireComponent } from './overview/questionnaire/questionnaire.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ScoreComponent,
    QuestionnaireComponent,
    ChooseTopicComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
