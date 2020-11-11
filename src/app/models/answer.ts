export class Answer {
    isCorrect = false;
    checkedByUser? : boolean;
    answeredCorrectly?: boolean;

    constructor(
        public text: string
    ) {
    }
}
