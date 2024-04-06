import { QuestionModel } from "../models/quiz.model";

class QuizController{
    constructor() {
        this.questionModel = new QuestionModel();
    }

    getQuestions() {
        return this.questionModel.getQuestions();
    }

    checkAnswer(questionIndex, userAnswer) {
        const correctAnswer = this.questionModel.getAnswer(questionIndex);
        return correctAnswer === userAnswer;
    }
}

export {QuizController}