import { Injectable } from '@angular/core';
import { UserResult } from '../models/userResult';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreCalculationService {

  constructor() { }

  calculateScore(userResult: UserResult[]): Score {
      throw Error('not implemented');
  }
}
