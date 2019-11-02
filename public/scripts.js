let gameStarted = false;
let num1 = 0;
let num2 = 0;
let startTime = 0;
let currQuestion = 0;

let distractorContainer = document.getElementById('distractor-container')
let mathGame = document.getElementById('math-game')
let finishTime = document.getElementById('finish-time')
let questionNum = document.getElementById('question-num')
let firstNum = document.getElementById('first-number')
let secondNum = document.getElementById('second-number')
let outputInput = document.getElementById('output-input')
let distractionTimeout;

outputInput.value = ''


const beginGame = function() {
    gameStarted = true;
    currQuestion = 1;
    startTime = (new Date()).getTime()
    finishTime.style.opacity = 0
    distractionTimeout = setInterval(addDistractor, 400)
    nextQuestion()
    playSong();
}

const endGame = function() {
    gameStarted = false;
    finishTime.innerHTML = Math.round(((new Date()).getTime() - startTime) / 1000) + 's'
    finishTime.style.opacity = 1
    clearTimeout(distractionTimeout)
    distractorContainer.innerHTML = ''

    stopSong();
}

const playSong = function() {
    let song = document.getElementById("song"); 
    song.play();
}

const stopSong = function() {
    let song = document.getElementById("song");
    song.pause();
}

const checkAnswer = function(answer) {
    if(gameStarted && num1 + num2 == parseInt(answer)) {
        currQuestion += 1

        if(currQuestion > 10) {
            endGame()
            return
        }

        nextQuestion()
    }
}

const colorOptions = ['blue', 'red', 'black', 'green', 'purple', 'brown']
const nextQuestion = function() {
    questionNum.innerHTML = currQuestion
    num1 = Math.floor(Math.random()*100)
    num2 = Math.floor(Math.random()*100)
    firstNum.innerHTML = num1
    secondNum.innerHTML = num2
    firstNum.style.fontSize = Math.floor(Math.random()*60+40) + 'px'
    secondNum.style.fontSize = Math.floor(Math.random()*60+40) + 'px'
    outputInput.value = ''
    mathGame.style.color = colorOptions[Math.floor(Math.random()*6)]

}

const addDistractor = function() {
    let distractors = document.getElementsByClassName('distractor')
    if(distractors.length > 10) {
        distractors[0].remove()
    }
    let newDistractor = document.createElement('div');
    newDistractor.style.backgroundColor = colorOptions[Math.floor(Math.random()*6)]
    newDistractor.style.top = Math.floor(Math.random()*100) + '%'
    newDistractor.style.left = Math.floor(Math.random()*100) + '%'
    newDistractor.classList.add('distractor')
    distractorContainer.appendChild(newDistractor);
}

document.getElementById("play-button").addEventListener("click", beginGame); 
outputInput.addEventListener("input", (e) => {
    checkAnswer(e.target.value)
})

