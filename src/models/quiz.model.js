import { readFileSync } from 'fs';
class QuestionModel{
    constructor() {
        this.questions = JSON.parse(readFileSync('/home/mahesh/quiz_app/src/data/questions.json'));
    }

    getQuestions() {
        return this.questions;
    }

    getAnswer(questionIndex) {
        return this.questions[questionIndex].answer;
    }
}

export default QuestionModel;