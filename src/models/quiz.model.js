import fs from "fs";

class QuestionModel{
    constructor() {
        this.questions = JSON.parse(fs.readFileSync('src/models/quiz.model.js'));
    }

    getQuestions() {
        return this.questions;
    }

    getAnswer(questionIndex) {
        return this.questions[questionIndex].answer;
    }
}

export {QuestionModel}