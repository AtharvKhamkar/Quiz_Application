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

    getAllAnswerList() {
        const allAnswer = [];
        this.questions.forEach((question) =>
            allAnswer.push(question.answer));
        return allAnswer;
    }
}

export default QuestionModel;