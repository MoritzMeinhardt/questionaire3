import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreComponent } from './score.component';
import { Answer } from '../../models/answer';
import { DataMock } from '../../testing/data.mock';

describe('Component: ScoreComponent', () => {
    let fixture: ComponentFixture<ScoreComponent>;
    let scoreComponent: ScoreComponent;
    beforeEach(() => TestBed.configureTestingModule({
            declarations: [
                ScoreComponent
            ]
        })
            .compileComponents()
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ScoreComponent);
        scoreComponent = fixture.componentInstance;
    });

    it('be should created', () => {
        expect(fixture).toBeTruthy();
        expect(scoreComponent).toBeTruthy();
    });

    describe('returnCorrectAnswer()', () => {
        it('should return correct answer for mamal question', () => {
            const answers: Answer[] = DataMock.getQuestionAndAnswers()[0].answers;
            const expectedCorrectAnswer: Answer = {
                text: 'Cat',
                isCorrect: true,
            };
            const actualCorrectAnswer: Answer = scoreComponent.returnCorrectAnswer(answers);
            expect(actualCorrectAnswer).toEqual(expectedCorrectAnswer);
        });

        it('should return correct answer for math question', () => {
            const answers: Answer[] = DataMock.getQuestionAndAnswers()[1].answers;
            const expectedCorrectAnswer: Answer = {
                text: '5',
                isCorrect: true,
            };
            const actualCorrectAnswer: Answer = scoreComponent.returnCorrectAnswer(answers);
            expect(actualCorrectAnswer).toEqual(expectedCorrectAnswer);
        });
    });

    describe('countCorrectAnswers()', () => {
        beforeEach(() => {
            scoreComponent.userResults = DataMock.getUserResultOfQuestion();
            fixture.detectChanges();
        });
        it('should count correct answer correctly when 2 questions are answered correctly', () => {
            const expectedScore = 2;
            scoreComponent.ngOnInit();
            expect(scoreComponent.score).toEqual(expectedScore);
        });

        it('should count correct answer correctly when 1 question is answered correctly', () => {
            scoreComponent.userResults[0].userAnswers = {
                text: 'Ant',
                isCorrect: false,
            };
            const expectedScore = 1;
            scoreComponent.ngOnInit();
            expect(scoreComponent.score).toEqual(expectedScore);
        });

        it('should count correct answer correctly when no questions are answered correctly', () => {
            scoreComponent.userResults[0].userAnswers = {
                text: 'Ant',
                isCorrect: false,
            };
            scoreComponent.userResults[1].userAnswers = {
                text: '2',
                isCorrect: false,
            };
            const expectedScore = 0;
            scoreComponent.ngOnInit();
            expect(scoreComponent.score).toEqual(expectedScore);
        });
    });
});
