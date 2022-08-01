
// Set all my variables
var timerEl = document.getElementById("timer")
var startButton = document.getElementById("startButton");
var startPage = document.getElementById("startPage");
var questionPage = document.getElementById("questionPage");
var questionEl = document.getElementById("question");
var response = document.getElementById("response");
var answersElement = document.getElementById("answers");
var endPage = document.getElementById("endPage");
var scoreEl = document.getElementById("score");
var initialsButton = document.getElementById("submitInitials");
var initialsEl = document.getElementById("initials");
var highscoresPage = document.getElementById("highscorePage");
var scoresListEl = document.getElementById("scoresList");
var highscoresLink = document.getElementById("highscoreLink");
currentQuestion = 0;

// create questions
var questions = [{
    question : "Commonly used data types DO Not Include:",
    options : ["strings", "booleans", "alerts", "numbers"],
    answer : "alerts"
},  {
    question : "Arrays in JavaScript can be used to store _____.",
    options : ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer : "all of the above"
}]

// set the time and the initialize the timer which i call clock
var setTime = 75;
var timer;
var clock;

function init() {
    timer = setTime;
    timerEl.innerHTML = timer;

}

// starts the timer and decrements every second
function startTimer() {
    timerEl.innerHTML = timer;
    clock = setInterval(function() {
        if (timer > 0){

            timer--;
            timerEl.innerHTML = timer;
        } else {
            clearInterval(clock);
            endGame();
        }
    }, 1000);

}

// ends the game by clearing the timer and sending you to the end page
function endGame() {
    currentQuestion = 0;
    clearInterval(clock);
    scoreEl.innerHTML = timer;
    questionPage.style.display = "none";
    endPage.style.display = "initial";


}

// Displays a question for the array of objects set above
function giveQuestion() {
    if (questions.length > currentQuestion) {
        questionEl.innerHTML = questions[currentQuestion].question;
        for (let i = 0; i < questions[currentQuestion].options.length; i++) {
            var newOptionEl = document.createElement("li");
            newOptionEl.innerHTML = questions[currentQuestion].options[i];
            answersElement.append(newOptionEl);

        }
    } else {
        // if no more objects then end the game because all the questions were answered
        endGame();
    }


}

// begins the game(called by the button click)
function begin() {
    startPage.style.display = "none";
    questionPage.style.display = "initial";
    startTimer();
    giveQuestion();


}

// removed the child elements from the answer options
function clearOptions() {
    var length = answersElement.children.length;
    for (let i = 0; i < length; i++){
        answersElement.removeChild(answersElement.lastChild);
    }
}

// check if the answer was chosen correctly or incorrectly
function checkAnswer(event) {
    var targetEl = event.target;
    if (!questions[currentQuestion])return;
    if (targetEl.innerHTML == questions[currentQuestion].answer){
        response.innerHTML = "Correct";
        currentQuestion++;
        clearOptions();
        giveQuestion();
    } else {
        response.innerHTML = "Incorrect";
        if (timer >= 10) {
            timer -= 10;
        } else {
            timer = 0;
        }
        timerEl.innerHTML = timer;
    }

}

// show the highscores
function showScores() {
    timer = setTime;
    highscoresLink.innerHTML = "Go back";
    var length = scoresListEl.children.length;
    for (let i = 0; i < length; i++){
        scoresListEl.removeChild(scoresListEl.lastChild);
    }
    startPage.style.display = "none";
    questionPage.style.display = "none";
    endPage.style.display = "none";
    highscoresPage.style.display = "initial";
    // get the highscores from localstorage
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if (!highscores){
        highscores = [];
    }
    // determine how many to display(either the number of elements or 5 elements depending on how long the array is)
    var length = Math.min(highscores.length, 5);
    for (let i = 0; i < length; i++){
        var newScore = document.createElement("li");
        newScore.textContent = highscores[i].initials + " - " + highscores[i].time;
        scoresListEl.append(newScore);
    }
    


}

// goes back to the start page
function goHome() {
    highscoresLink.innerHTML = "View high scores";
    startPage.style.display = "block";
    questionPage.style.display = "none";
    endPage.style.display = "none";
    highscoresPage.style.display = "none";
    timer = setTime;
    timerEl.innerHTML = timer;
}

// listeners
startButton.addEventListener("click", begin);
answersElement.addEventListener("click", checkAnswer);
initialsButton.addEventListener("click", function () {
    event.preventDefault();
    if (!initialsEl.value)return;
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if (!highscores){
        highscores = [];
    }
    // create the new score object which saves the initials and score
    var newScore = {
        initials: initialsEl.value,
        time: timer
    };
    // push the new object to the array of highscores
    highscores.push(newScore);
    // sort the array in descending order by the time
    highscores.sort((a, b) => b.time - a.time);


    // storing to the local storage 
    localStorage.setItem("highscores", JSON.stringify(highscores));
    showScores();
});
highscoresLink.addEventListener("click", function (){
    if (highscoresLink.innerHTML == "View high scores") {
        showScores();
    } else {
        goHome();
    }
});





init();