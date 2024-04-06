import { sendResponse } from "../utils/response.util.js";
import QuizController from "./quiz.controller.js";
const quizController = new QuizController();


//function that fetch calculated score and answerStatus array that return all correct answer array (right - 1 , wrong-0)
export function handleQuizSubmission(req,res) {
    const answers = req.body;
    const { score, answerStatus } = calculateScore(answers);
    sendResponse(res, 200, 'application/json', JSON.stringify({ score,answerStatus }));
}

//function that fetch answer from json and return these answers in single array as a response.
export function showAnswers(req, res){
    const answers = quizController.getAnswers();
    sendResponse(res,200,'application/json',JSON.stringify(answers))
}

//function that calculate answers if answer is correct it increases counter and mark in array as 1(right answer)
export function calculateScore(answers) {
    let score = 0;
    let answerStatus = new Array(15).fill(0);
    answers.forEach((answer, index) => {
        if (quizController.checkAnswer(index, answer)) {
            answerStatus[index] = 1
            score++;
        }
    })

    return {score,answerStatus};
}

//function that fetch all the question from JSON file and return as a response
export function provideQuestion(req, res) {
    const questions = JSON.stringify(quizController.getQuestions());
    sendResponse(res, 200, 'application/json', questions);
}
