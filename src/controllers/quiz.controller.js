import QuestionModel from '../models/quiz.model.js';
class QuizController{
    constructor() {
        this.questionModel = new QuestionModel();
    }

    getQuestions() {
        return this.questionModel.getQuestions();
    }

    checkAnswer(questionIndex, userAnswer) {
        const correctAnswer = this.questionModel.getAnswer(questionIndex);
        return userAnswer === correctAnswer;
    }
}

export default QuizController;