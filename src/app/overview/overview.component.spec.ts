import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { QuestionProviderService } from '../services/question-provider.service';
import { ScoreComponent } from './score/score.component';
import { DataMock } from '../testing/data.mock';
import { UserResult } from '../models/userResult';
import { Answer } from '../models/answer';
import { QuestionAndAnswers } from '../models/questionAndAnswers';

describe('Component: OverviewComponent', () => {
    let fixture: ComponentFixture<OverviewComponent>;
    let overviewComponent: OverviewComponent;
    let questionProviderService: QuestionProviderService;
    const mockQuestionProviderService = jasmine.createSpyObj('QuestionProviderService', ['getQuestions']);

    beforeEach(() => TestBed.configureTestingModule({
            declarations: [
                OverviewComponent,
                ScoreComponent,
            ],
            providers: [
                {provide: QuestionProviderService, useValue: mockQuestionProviderService}
            ]
        })
            .compileComponents()
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OverviewComponent);
        questionProviderService = TestBed.get(QuestionProviderService);
        overviewComponent = fixture.componentInstance;
    });

    beforeEach(() => {
        mockQuestionProviderService.getQuestions.and.returnValue(DataMock.getQuestionAndAnswers());
    });

    it('be should created', () => {
        expect(fixture).toBeTruthy();
        expect(questionProviderService).toBeTruthy();
        expect(overviewComponent).toBeTruthy();
    });

    describe('onUserFeedback()', () => {
        it('should update userResults correctly when user answered first question', () => {
            const expectedUserResult: UserResult[] = [DataMock.getUserResultOfQuestionAllAnsweredCorrectly()[0]];
            const answer: Answer = DataMock.getUserResultOfQuestionAllAnsweredCorrectly()[0].userAnswers[0];
            const questionAndAnswers: QuestionAndAnswers = DataMock.getUserResultOfQuestionAllAnsweredCorrectly()[0].questionAndAnswers;
            overviewComponent.onUserFeedback(answer, questionAndAnswers);
            fixture.detectChanges();
            expect(JSON.stringify(overviewComponent.userResults)).toEqual(JSON.stringify(expectedUserResult));
        });

        it('should update userResults correctly when user answered second question', () => {
            overviewComponent.userResults.push(DataMock.getUserResultOfQuestionAllAnsweredCorrectly()[0]);
            const expectedUserResult: UserResult[] = DataMock.getUserResultOfQuestionAllAnsweredCorrectly();
            const answer: Answer = DataMock.getUserResultOfQuestionAllAnsweredCorrectly()[1].userAnswers[0];
            const questionAndAnswers: QuestionAndAnswers = DataMock.getUserResultOfQuestionAllAnsweredCorrectly()[1].questionAndAnswers;
            overviewComponent.onUserFeedback(answer, questionAndAnswers);
            fixture.detectChanges();
            expect(JSON.stringify(overviewComponent.userResults)).toEqual(JSON.stringify(expectedUserResult));
        });

        it('should update userResults correctly when user answered second question twice', () => {
            overviewComponent.userResults.push(...DataMock.getUserResultOfQuestionAllAnsweredCorrectly());
            const expectedUserResult: UserResult[] = DataMock.getUserResultOfQuestionAllAnsweredCorrectly();
            expectedUserResult[1].userAnswers = [{...getCatAnswer(), checkedByUser: true}];
            fixture.detectChanges();
            const answer: Answer = getCatAnswer();
            const questionAndAnswers: QuestionAndAnswers = DataMock.getUserResultOfQuestionAllAnsweredCorrectly()[1].questionAndAnswers;
            overviewComponent.onUserFeedback(answer, questionAndAnswers);
            fixture.detectChanges();
            expect(JSON.stringify(overviewComponent.userResults)).toEqual(JSON.stringify(expectedUserResult));
        });
    });
});

function getCatAnswer(): Answer {
    return {
        text: '2',
        isCorrect: false,
    };
}
