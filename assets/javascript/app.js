const quizQuestions = [ 
    {
        question: 'What year did the original Lion King release?',
        choices: ["1993", "1998", "1994", "2019"],
        correctAnswer: "1994"
    },
    {
        question: 'Who is Mufasa\'s son?',
        choices: ["Nala", "Scar", "Pumba", "Simba"],
        correctAnswer: "Simba"
    },
    {
        question: 'What type of bird is Zazu?',
        choices: ["Hornbill", "Parrot", "Dove", "Crow"],
        correctAnswer: "Hornbill"
    },
];

// Initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// If the timer is over, then go to the next question
function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        // TODO
        console.log('Game is over!!!!!');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
    
}

// Start a 15 seconds timer for user to respond or choose an answer to each question
function timeUp() {
    clearInterval(timer);
    lost++;
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;
    $('#time').html('Timer: ' + counter);
      if (counter === 0) {
        timeUp();
    }
}

// Display the question and the choices to the browser
function loadQuestion() {
    counter = 15;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; // 
    const choices = quizQuestions[currentQuestion].choices; // 

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

// Either correct/wrong choice selected, go to the next question
// Event Delegation
$(document).on('click', '.choice', function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('Winsss!!!!');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log('Lost!!!!');
        setTimeout(nextQuestion, 3 * 1000);
    }
});


function displayResult() {
    const result = `
        <p>You got ${score} question(s) right</p>
        <p>You missed ${lost} question(s)</p>
        <p>Total questions: ${quizQuestions.length} </p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}


$(document).on('click', '#reset', function() {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});


function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}

$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});


