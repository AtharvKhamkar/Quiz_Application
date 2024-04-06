import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import QuizController from './controllers/quiz.controller.js';

const app = express();
const PORT = 1313;
const quizController = new QuizController();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname,"public")))

app.use(bodyParser.json());

app.get('/', (req, res) => {
    serveStaticFile(res, 'text/html', '/views/index.html');
})

app.get('/questions', (req, res) => {
    sendResponse(res, 200, 'application/json', JSON.stringify(quizController.getQuestions()));
});

app.post('/submit', (req, res) => {
    handleQuizSubmission(req, res);
})

app.use((req, res) => {
    sendResponse(res, 404, 'text/plain', 'Page not found')
});



function serveStaticFile(res, contentType, filePath) {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            sendResponse(res, 500, 'text/plain', `${err}`);
            return;
        }
        sendResponse(res, 200, contentType, data);
    });
}


function sendResponse(res, statusCode, contentType, data) {
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
}

function handleQuizSubmission(req,res) {
    const answers = req.body;
    const score = calculateScore(answers);
    sendResponse(res, 200, 'application/json', JSON.stringify({ score }));
}

function calculateScore(answers) {
    let score = 0;
    answers.forEach((answer, index) => {
        if (quizController.checkAnswer(index, answer)) {
            score++;
        }
    })
    return score;
}


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})