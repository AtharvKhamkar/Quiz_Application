import bodyParser from 'body-parser';
import dotenv from "dotenv";
import express from 'express';
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { handleQuizSubmission, provideQuestion, showAnswers } from './controllers/functionality.controller.js';
import { sendResponse } from './utils/response.util.js';

dotenv.config({
    path: './env'
})
const app = express();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



app.use(express.static(path.join(__dirname,"public")))


//middleware used to parse JSON data into javascript object
app.use(bodyParser.json());


//home endpoint that serves index.html file as a home page
app.get('/', (req, res) => {
    serveStaticFile(res, 'text/html', '/views/index.html');
})


//Endpoint that serves all the questions
app.get('/questions', (req, res) => {
    provideQuestion(req, res);
});


//Endpoint that handles functionality of checking score after submission
app.post('/submit', (req, res) => {
    handleQuizSubmission(req, res);
})


//Endpoint that displays all the answers of the each question
app.get('/check-answers', (req, res) => {
    showAnswers(req, res);
})


//This endpoint is used to handle request at the unknown endpoint
app.use((req, res) => {
    sendResponse(res, 404, 'text/plain', 'Page not found')
});

//function to serve static files in the project directory
function serveStaticFile(res, contentType, filePath) {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            sendResponse(res, 500, 'text/plain', `${err}`);
            return;
        }
        sendResponse(res, 200, contentType, data);
    });
}

//server is running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})