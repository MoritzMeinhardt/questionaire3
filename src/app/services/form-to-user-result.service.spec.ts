import { TestBed } from '@angular/core/testing';

import { FormToUserResultService } from './form-to-user-result.service';
import { DataMock } from '../testing/data.mock';

describe('FormToUserResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormToUserResultService = TestBed.get(FormToUserResultService);
    expect(service).toBeTruthy();
  });

  describe('mapToUserResult', () => {

      it('should create expected user result', () => {
          const service: FormToUserResultService = TestBed.get(FormToUserResultService);

          const userAnswers = [
              [null, null, true, null],
              [null, true, null, null],
              [true, true, true, null],
          ];

          const expected = DataMock.getUserResultOfQuestionAllAnsweredCorrectly();
          const actual = service.mapFormToUserResult(userAnswers, {topic: '', questionAndAnswers: DataMock.getQuestionAndAnswers()});
          expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
      })
  })
});
