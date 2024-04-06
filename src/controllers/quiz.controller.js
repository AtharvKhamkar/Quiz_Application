import QuestionModel from '../models/quiz.model.js';
class QuizController{
    constructor() {
        this.questionModel = new QuestionModel();
    }
    
    //get all question from QuestionModel
    getQuestions() {
        return this.questionModel.getQuestions();
    }
    
    //check userAnswer provided in parameter with actual answer in JSON file
    checkAnswer(questionIndex, userAnswer) {
        const correctAnswer = this.questionModel.getAnswer(questionIndex);
        return userAnswer === correctAnswer;
    }
     
    //Get all answers from QuestionModel
    getAnswers() {
        return this.questionModel.getAllAnswerList();
    }


}

export default QuizController;