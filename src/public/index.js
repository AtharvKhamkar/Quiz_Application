function loadQuestions() {
    fetch('/questions')
        .then(response => response.json())
        .then(questions => {
            const quizDiv = document.getElementById('quiz');
            questions.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.innerHTML = `<p>${index + 1}.${question.question}<p/>`;
                question.options.forEach(option => {
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `question${index}`;
                    radio.value = option;
                    questionDiv.appendChild(radio);
                    questionDiv.innerHTML += `<label>${option}</label><br>`;
                });
                quizDiv.appendChild(questionDiv);
            });
        });
}

function submitAnswer() {
    const answers = [];
    const radioGroups = document.querySelectorAll('[name^="question"]');
    radioGroups.forEach(radioGroup => {
        const selectedOptions = [...radioGroup.children].find(child => child.checked);
        if (selectedOptions) {
            answers.push(selectedOptions.value);
        }
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
    })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `Your score: ${data.score}/${radioGroups.length}`;
        });

}

document.addEventListener('DOMContentLoaded',loadQuestions)


