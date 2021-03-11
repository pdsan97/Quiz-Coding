const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerElement = document.getElementById("timer")
let shuffledQuestions, currentQuestionIndex

let totalScore = 0

let timer = 75

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function doit() {
    timer--
    timerElement.innerText = timer
    if (timer <= 0) {
        alert("You are out of time! Press to reset")
        location.reload();
        startGame()
        timer = 6
    }
}
var interval;
function startGame() {
    // interval
    interval = setInterval(doit, 1000)

    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    console.log(totalScore, "each")
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.onclick = function () { totalScore++; }
        } else {
            button.onclick = function () { timer = timer - 10 }
        }
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        alert("You passed " + totalScore + " questions")
        startButton.innerText = 'Restart'
        clearInterval(interval)
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'you create full-height columns with the float tag',
        answers: [
            { text: 'true', correct: true },
            { text: 'false', correct: false }
        ]
    },
    {
        question: 'HTML organized for different operating systems',
        answers: [
            { text: 'CSS', correct: false },
            { text: 'HTML', correct: false },
            { text: 'XHTML', correct: true },
            { text: 'ROOT', correct: false }
        ]
    },
    {
        question: 'A rule describing how to format a particular portion of a web page?',
        answers: [
            { text: 'Tags', correct: false },
            { text: 'Style', correct: true },
            { text: 'The Internet', correct: false },
            { text: 'None of the above', correct: false }
        ]
    },
    {
        question: 'The Button is the least used form tag?',
        answers: [
            { text: 'true', correct: false },
            { text: 'false', correct: true }
        ]
    }
]

