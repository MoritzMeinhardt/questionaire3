import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OverviewComponent} from './overview.component';
import {QuestionProviderService} from '../services/question-provider.service';
import {QuestionComponent} from '../question/question.component';
import {ScoreComponent} from '../score/score.component';
import {DataMock} from '../testing/data.mock';
import {UserResult} from '../models/userResult';
import {Answer} from '../models/answer';
import {QuestionAndAnswers} from '../models/questionAndAnswers';

describe('Component: OverviewComponent', () => {
    let fixture: ComponentFixture<OverviewComponent>;
    let overviewComponent: OverviewComponent;
    let questionProviderService: QuestionProviderService;
    const mockQuestionProviderService = jasmine.createSpyObj('QuestionProviderService', ['getQuestions']);

    beforeEach(() => TestBed.configureTestingModule({
            declarations: [
                OverviewComponent,
                QuestionComponent,
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
            const expectedUserResult: UserResult[] = [DataMock.getUserResultOfQuestion()[0]];
            const answer: Answer = DataMock.getUserResultOfQuestion()[0].userAnswers;
            const questionAndAnswers: QuestionAndAnswers = DataMock.getUserResultOfQuestion()[0].questionAndAnswers;
            overviewComponent.onUserFeedback(answer, questionAndAnswers);
            fixture.detectChanges();
            expect(JSON.stringify(overviewComponent.userResults)).toEqual(JSON.stringify(expectedUserResult));
        });

        it('should update userResults correctly when user answered second question', () => {
            overviewComponent.userResults.push(DataMock.getUserResultOfQuestion()[0]);
            const expectedUserResult: UserResult[] = DataMock.getUserResultOfQuestion();
            const answer: Answer = DataMock.getUserResultOfQuestion()[1].userAnswers;
            const questionAndAnswers: QuestionAndAnswers = DataMock.getUserResultOfQuestion()[1].questionAndAnswers;
            overviewComponent.onUserFeedback(answer, questionAndAnswers);
            fixture.detectChanges();
            expect(JSON.stringify(overviewComponent.userResults)).toEqual(JSON.stringify(expectedUserResult));
        });

        it('should update userResults correctly when user answered second question twice', () => {
            overviewComponent.userResults.push(...DataMock.getUserResultOfQuestion());
            const expectedUserResult: UserResult[] = DataMock.getUserResultOfQuestion();
            expectedUserResult[1].userAnswers = getCatAnswer();
            fixture.detectChanges();
            const answer: Answer = getCatAnswer();
            const questionAndAnswers: QuestionAndAnswers = DataMock.getUserResultOfQuestion()[1].questionAndAnswers;
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
